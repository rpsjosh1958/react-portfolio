import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({ isOpen, closeModal, children, title, panelClassName }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full transform overflow-hidden rounded-2xl bg-white dark:bg-[#1c1c1c] p-6 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-800 ${panelClassName || 'max-w-4xl'}`}>
                 {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-black dark:text-white mb-4"
                  >
                    {title}
                  </Dialog.Title>
                )}
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  {children}
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
