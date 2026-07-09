---
date: '2026-07-04T01:00:00.000Z'
title: "I Stopped Using useEffect for Data Fetching, and My React App Finally Feels 'Alive'"
tagline: Stop syncing. Start deriving.
preview: >-
  We've all been there. You start a React project, and useEffect feels like the
  BOSS of hooks. But as my project grew, that BOSS
  started feeling more like a ticking time bomb.
image: ''
tag: Tech
---

We've all been there. You start a React project, and `useEffect` feels like the "boss" of hooks. Need to fetch data? `useEffect`. Need to sync state? `useEffect`. Need to update local storage? `useEffect`.

But as my project, **THE DROP**, grew across Mobile (Expo) and Web (Next.js), that "boss" started feeling more like a ticking time bomb. I was spending more time debugging weird re-renders and stale data than actually building features.

Then I went down a rabbit hole — the "Don't use useEffect" movement was all over X, and the React docs' "You Might Not Need an Effect" section basically slapped me in the face. So I did something drastic and refactored the whole thing.

Here's what happened.

---

## 1. The Problem: "Effect Hell" 

Honestly? My codebase was a mess. `VendorContext` and the Admin pages were drowning in patterns like:

- **Manual loading states:** `const [loading, setLoading] = useState(true);` — everywhere.
- **Race conditions:** User switches tabs fast, wrong data resolves. Classic.
- **Double-renders:** React 18's Strict Mode fires effects twice in dev. Double API calls. Fun times.
- **The dependency array nightmare:** Miss one variable → stale data. Add too many → infinite loop. There's no winning.

At some point I realised I was writing more code to manage the side effects of my side effects. That's when I knew something had to change.

## 2. What I Switched To 

I landed on three things that basically replaced 80% of my `useEffect` usage:

1. **TanStack Query (React Query):** Handles all server state — Firestore fetches, caching, background refetching, the lot.
2. **Derived State:** Instead of syncing one state into another with an effect, just compute it inline or with `useMemo`. Simple.
3. **Event Handlers for Side Effects:** If something should happen *because the user did something*, put it in the click/press handler. Not in an effect that watches state.

---

## 3. Real-World Refactors

### A. Data Fetching (Web Admin)

This is the admin nav badge — it shows unread complaint/order counts in real time.

**Before:** Manual `onSnapshot` inside a `useEffect`. Looked clean until it didn't.

```tsx
// Before — useEffect + onSnapshot
export function AdminNavBadge({ type }: { type: "complaints" | "orders" }) {
  const { storeId } = useAdminStore();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!storeId) return;

    const q = query(
      collection(db, "stores", storeId, type),
      where("status", "in", ["unread", "paid", "open"])
    );

    // Manual subscription — easy to forget cleanup
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe(); // Miss this once and you have a memory leak
  }, [storeId, type]); // Fragile dep array

  if (count === 0) return null;
  return <span className="badge">{count}</span>;
}
```

**After:** Swapped it for `useQuery`. Now when I navigate from Products to Orders and back, the data is already there — no flicker, no spinner, instant.

```tsx
// After — useQuery
export function AdminNavBadge({ type }: { type: "complaints" | "orders" }) {
  const { storeId } = useAdminStore();

  const { data: count = 0 } = useQuery({
    queryKey: ["badge", storeId, type],
    queryFn: async () => {
      const q = query(
        collection(db, "stores", storeId!, type),
        where("status", "in", ["unread", "paid", "open"])
      );
      const snap = await getDocs(q);
      return snap.size;
    },
    enabled: !!storeId,
    staleTime: 1000 * 30, // Cache for 30 seconds
  });

  if (count === 0) return null;
  return <span className="badge">{count}</span>;
}
```

No manual cleanup. No dependency arrays. No memory leaks. TanStack just handles it.

---

### B. Cart Persistence (Mobile)

**Before:** A `useEffect` watched the `items` array and wrote to `AsyncStorage` every time it changed. Sounds fine — until you realise it fires on *every render* that touches cart state, not just the meaningful ones.

```tsx
// Before — useEffect watching items
const [cart, setCart] = useState<CartItem[]>([]);

useEffect(() => {
  // This fires on EVERY cart change, even intermediate ones
  AsyncStorage.setItem(`cart-${storeId}`, JSON.stringify(cart));
}, [cart, storeId]); // Runs more than you think
```

**After:** Moved the storage write directly into `addToCart` and `removeFromCart`. Now I know exactly when the disk is being touched.

```tsx
// After — explicit save inside each handler
const saveCartToStorage = useCallback(async (newCart: CartItem[]) => {
  if (!storeId) return;
  await AsyncStorage.setItem(`cart-${storeId}`, JSON.stringify(newCart));
}, [storeId]);

const addToCart = useCallback((newItem: Omit<CartItem, "quantity">) => {
  setCart((prev) => {
    const existing = prev.find(
      (item) => item.id === newItem.id && item.variant?.id === newItem.variant?.id
    );

    const nextCart = existing
      ? prev.map((item) =>
          item.id === newItem.id && item.variant?.id === newItem.variant?.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...prev, { ...newItem, quantity: 1 }];

    saveCartToStorage(nextCart); // 👈 Explicit, synchronous, predictable
    return nextCart;
  });
}, [saveCartToStorage]);

const removeFromCart = useCallback((id: string, variantId?: string) => {
  setCart((prev) => {
    const nextCart = prev.filter(
      (item) => !(item.id === id && item.variant?.id === variantId)
    );
    saveCartToStorage(nextCart); // 👈 Called only when actually needed
    return nextCart;
  });
}, [saveCartToStorage]);
```

The effect felt "smart" but it was just unpredictable. The handler is boring and obvious — and that's exactly the point.

---

### C. Complex Forms (Product Variants)

The product form generates variant combinations from options (Size × Color = 6 variants, etc.).

**Before:** An effect watched the `options` array and regenerated everything on every keystroke. While the vendor was *still typing*. It was slow, janky, and kept wiping their custom stock/price inputs.

```tsx
// Before — auto-regenerate on every options change
useEffect(() => {
  if (hasVariants) {
    const generated = generateVariants(options); // Runs while user is still typing
    setVariants(generated); // Overwrites any manual edits to stock/price
  } else {
    setVariants([]);
  }
}, [options, hasVariants]); // Fires constantly during input
```

**After:** I just added a "Sync Variants" button. Same logic, same `generateVariants` function — but now it only runs when the user actually asks for it.

```tsx
// After — user-initiated via button
const handleSyncVariants = () => {
  if (hasVariants) {
    const generated = generateVariants(options);
    setVariants(generated); // User chose when to run this
  } else {
    setVariants([]);
  }
};

// In JSX:
<button type="button" onClick={handleSyncVariants}>
  Sync Variants
</button>
```

Honestly the fix took five minutes. The lesson is that not everything needs to be automatic — sometimes giving the user a button is just the right call.

---

## 4. What Actually Changed 

- **Speed:** Navigation feels instant. TanStack Query serves cached data before the network even responds.
- **Less code:** Deleted hundreds of lines of `isLoading`, `isError`, `useEffect` cleanup boilerplate. Good riddance.
- **Stability:** Race conditions are just... gone. TanStack handles request deduplication and cancellation out of the box.
- **Debugging is actually fun now:** TanStack DevTools shows exactly what's cached, what's stale, and why. No more guessing.

## 5. Rules I Follow Now 

1. **Never `useEffect` + `fetch`.** Use TanStack Query or SWR. Always.
2. **Don't sync, derive.** Got `firstName` and `lastName`? Don't effect-set `fullName`. Just write `const fullName = firstName + ' ' + lastName` in the component body. Done.
3. **Effects are for external systems only.** Browser APIs, map libraries, stuff React doesn't control. That's it.
4. **Mutate and invalidate.** Use `useMutation` for writes, then call `queryClient.invalidateQueries` to refresh. Clean.

---

### Final Thoughts

Getting rid of `useEffect` isn't about chasing trends — it's about writing code that actually makes sense when you read it back. Declarative beats imperative every time. My app is faster, I don't dread dependency arrays anymore, and honestly the whole codebase just feels less fragile.

**Stop syncing. Start deriving.**
