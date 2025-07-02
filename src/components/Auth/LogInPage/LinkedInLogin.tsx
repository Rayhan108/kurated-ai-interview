import { AllImages } from '@/assets/AllImages';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const LinkedInLogin = () => {
    return (
        <div>
            <Button className="flex items-center justify-center gap-4 border py-4 px-32 rounded-md text-sm font-semibold">
                {" "}
                <Image src={AllImages.linkedinIcon} alt="linkedin" /> Sign Up with
                Linkedin
            </Button>
        </div>
    );
};

export default LinkedInLogin;