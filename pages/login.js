// import Loading from "@/components/Loading";
// import { useSession, signIn, signOut } from "next-auth/react"
// import Image from "next/image";
// import { useRouter } from "next/router";

// const login = () => {

//     const { data: session, status } = useSession();

//     if (status === "loading") {
//         // Loading state, loader or any other indicator
//         return <div className='lodingdata flex flex-col flex-center wh_100'>
//             <Loading />
//             <h1 className='mt-1'>Loading...</h1>
//         </div>
//     }

//     const router = useRouter();

//     async function login() {
//         await router.push('/');
//         await signIn();
//     }

//     if (session) {
//         router.push('/');
//         return null; // Return null or any loading indicator while redirecting
//     }


//     if (!session) {
//         return (
//             <div className="loginfront flex flex-center flex-col full-w" >
//                 <Image src='/img/coder.png' width={250} height={250} />
//                 <h1  >Welcome Admin of the vbmblogs 👋</h1>
//                 <p  >Visit our main website <a href="https://vbmcoder.in">vbmblogs</a></p>

//                 <button onClick={login} className='mt-2' >Login with Google</button>
//             </div>
//         )
//     }
// }

// export default login

import Loading from "@/components/Loading";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const login = () => {
  // Llama a useSession al inicio
  const { data: session, status } = useSession();

  const router = useRouter();

  async function login() {
    await router.push('/');
    await signIn();
  }

  if (status === "loading") {
    // Loading state, loader or any other indicator
    return <div className='lodingdata flex flex-col flex-center wh_100'>
      <Loading />
      <h1 className='mt-1'>Loading...</h1>
    </div>
  }

  if (session) {
    router.push('/');
    return null; // Return null or any loading indicator while redirecting
  }

  // Renderiza el login solo si no hay sesión
  return (
    <div className="loginfront flex flex-center flex-col full-w" >
      <Image src='/img/coder.png' width={250} height={250} />
      <h1  >Welcome Admin of the vbmblogs </h1>
      <p  >Visit our main website <a href="https://vbmcoder.in">vbmblogs</a></p>
      <button onClick={login} className='mt-2' >Login with Google</button>
    </div>
  );
}

export default login
