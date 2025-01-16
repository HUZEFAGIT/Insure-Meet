import React from 'react'
import { Button } from '../ui/button'
import RLogo from "../../assets/RadiaantR.png"
import RadiaantLogo from "../../assets/RadiaantLogo.png"

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-gray-900 text-white p-4 mb-6">
            <div className="flex items-center space-x-4">
                <img src={RLogo} width={50}></img>
                <div className="flex flex-col text-left">
                    <div className="text-xl font-semibold">RADIAANT</div>
                    <div className="text-sm font-semibold">Captive India Pvt. Ltd.</div>
                </div>

            </div>
            <div className="flex items-center space-x-4">
                <div className="text-sm">
                    <div>SuperAdmin</div>
                    <div className="text-gray-300">kuldeep.rathod@radiaant.com</div>
                </div>
                <Button variant="destructive" size="sm">Logout</Button>
            </div>
        </div>
    )
}

export default Header
