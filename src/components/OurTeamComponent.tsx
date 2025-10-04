import Image from "next/image";

export default function OurTeamComponent (){
    
    return (
    <div className="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Our team</h2>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">Creative people</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
            <div className="text-center">
            <Image className="rounded-full size-24 mx-auto" src="" alt="Avatar" width={120}
                  height={32}/>
            <div className="mt-2 sm:mt-4">
                <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                David Forren
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                Founder / CEO
                </p>
            </div>
            </div>

            <div className="text-center">
            <Image className="rounded-full size-24 mx-auto" src="" alt="Avatar" width={120}
                  height={32}/>
            <div className="mt-2 sm:mt-4">
                <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                Maria Powers
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                Director of sales
                </p>
            </div>
            </div>

            <div className="text-center">
            <Image className="rounded-full size-24 mx-auto" src="" alt="Avatar" width={120}
                  height={32}/>
            <div className="mt-2 sm:mt-4">
                <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                Delia Pawelke
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                Front-end Developer
                </p>
            </div>
            </div>

            <div className="text-center">
            <Image className="rounded-full size-24 mx-auto" src="" alt="Avatar" width={180}
                  height={60}/>
            <div className="mt-2 sm:mt-4">
                <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                Tom Lowry
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                UI/UX Designer
                </p>
            </div>
            </div>

            <div className="text-center">
            <Image className="rounded-full size-24 mx-auto" src="" alt="Avatar" width={180}
                  height={60}/>
            <div className="mt-2 sm:mt-4">
                <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                Louise Donadieu
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                Support Consultant
                </p>
            </div>
            </div>

        </div>
      
        <div className="mt-12 flex justify-center">
            <div className="border border-gray-200 py-2 px-3 rounded-full dark:border-neutral-700">
            <div className="flex items-center gap-x-3">
                <span className="text-sm text-gray-500 dark:text-neutral-500">Want to work with us?</span>
                <a className="inline-flex items-center gap-x-2 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-hidden focus:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600" href="#">
                We are hiring
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </a>
            </div>
            </div>
        </div>
        </div>
    )
}