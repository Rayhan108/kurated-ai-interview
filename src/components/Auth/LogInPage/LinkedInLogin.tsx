import { AllImages } from '@/assets/AllImages';

import Image from 'next/image';
import React from 'react';

const LinkedInLogin = () => {
    return (
        <div>
            <button className="flex items-center justify-center gap-4 border py-2 px-8 w-full bg-[#EAB030] rounded-md text-sm font-semibold">
                {" "}
                <Image src={AllImages.linkedinIcon} alt="linkedin" /> Sign Up with
                Linkedin
            </button>
        </div>
    );
};

export default LinkedInLogin;