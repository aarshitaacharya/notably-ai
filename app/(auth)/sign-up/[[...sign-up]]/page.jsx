import { SignUp } from '@clerk/nextjs';
import logo from '../../../../assets/logo.jpg';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
            }}

        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Notably AI</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Your ideas, your team - one unified workspace.
                Work doesn't feel like work here. 
                <br/>
                Jump in!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <Image
                  width={200}
                  height = {200}
                  src={logo}
                  alt="Logo"
                />
              </div>
            </div>

            <div className="mt-0">
              {/* You can use <SignIn /> from Clerk here instead of the custom form */}
              <SignUp />
            </div>

            <footer className="text-xs text-white-400 text-center mt-8 mb-4">
        © Aarshita Acharya {new Date().getFullYear()}
        </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
