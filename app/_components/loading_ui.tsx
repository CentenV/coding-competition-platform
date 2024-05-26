// LOADING UI COMPONENT //
// global loading ui used when waiting for a resource to be pushed to the client
import Image from 'next/image';

export default function LoadingUI({ size }: { size: number }) {
    // return (<div>Loading...</div>);
    return (
        <div className={`max-w-fit ml-auto mr-auto h-2/5`}>
            <Image src={"/loading.svg"} alt="Loading" width={size} height={size} />
        </div>
    );
}