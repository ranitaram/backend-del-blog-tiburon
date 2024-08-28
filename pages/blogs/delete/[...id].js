import Head from "next/head"
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsPostcard } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function DeleteProduct() {



    // login first
    const { data: session, status } = useSession();

    const router = useRouter();
    // Check if there's no active session and redirect to login page
    if (!session) {
        router.push('/login');
        return null; // Return null or any loading indicator while redirecting
    }

    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='flex flex-col flex-center wh_100'>
            <Loading />
            <h1 className='mt-1'>Loading...</h1>
        </div>
    }




    // const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/blogs?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id]);

    function goback() {
        router.push('/draft');
    }

    async function deleteProduct() {
        await axios.delete('/api/blogs?id=' + id)
        toast.success('Deleted Sucessfully!')
        goback();
    }
    return <>

        <Head>
            <title>Update Website</title>
        </Head>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Delete <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard /> <span>/</span><span>Delete Blog</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div class="deletecard">
                    <svg
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                    >
                        <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
                    </svg>
                    <p class="cookieHeading">Are you sure?</p>
                    <p class="cookieDescription">If you delete this website content it will be permenent delete your content.</p>

                    <div class="buttonContainer">
                        <button onClick={deleteProduct} class="acceptButton">Delete</button>
                        <button onClick={goback} class="declineButton">Cancel</button>
                    </div>
                </div>
            </div>

        </div>


    </>
}