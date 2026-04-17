const AboutPage = () => {
    return (
        <div
            className=" min-h-screen flex items-center justify-center p-4">
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 text-center mb-8 md:mb-0">
                        <img src="/img/avatar.jpg" alt="Profile Picture"
                             className="rounded-full object-cover w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105 "/>
                        <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">Shrek</h1>
                        <p className="text-gray-600 dark:text-gray-300">Full Stack Developer</p>
                        <br></br>
                        <a href="mailto:<a.zhurba0810@gmail.com>"
                           className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Email
                            Me
                        </a>
                    </div>
                    <div className="md:w-2/3 md:pl-8">
                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">A little about this
                            project</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            This is a chat application built with React, Node.js, and Socket.io.
                            It allows users to chat with each other in real-time.
                        </p>
                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Technologies
                            Used</h2>
                        <div className="flex gap-2 mb-6">
                            <div className="flex space-x-2 w-full justify-around">
                                <span
                                    className="hover:scale-150 hover:z-10 transform ease-in-out transition duration-500">
                                    <div
                                        className="flex justify-center items-center text-2xl sm:text-5xl bg-green-200 text-green-500 h-10 w-10 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-white">
                                       <img src="/icons/react.svg" alt="React" className="size-10"/>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center">React</p>
                                </span>
                                <span
                                    className="hover:scale-150 hover:z-10 transform ease-in-out transition duration-500">
                                    <div
                                        className="flex justify-center items-center text-2xl sm:text-5xl bg-green-200 text-green-500 h-10 w-10 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-white">
                                       <img src="/icons/express.svg" alt="Node.js" className="size-10"/>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Node.js(Express)</p>
                                </span>
                                <span
                                    className="hover:scale-150 hover:z-10 transform ease-in-out transition duration-500">
                                    <div
                                        className="flex justify-center items-center text-2xl sm:text-5xl bg-green-200 text-green-500 h-10 w-10 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-white">
                                       <img src="/icons/socket.svg" alt="Socket.io" className="size-10"/>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Socket.io</p>
                                </span>
                                <span
                                    className="hover:scale-150 hover:z-10 transform ease-in-out transition duration-500">
                                    <div
                                        className="flex justify-center items-center text-2xl sm:text-5xl bg-green-200 text-green-500 h-10 w-10 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-white">
                                       <img src="/icons/redux.svg" alt="Redux" className="size-10"/>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Redux</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutPage;