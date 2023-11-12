import React from 'react';
import { useAccount } from "@starknet-react/core";
import { useConnectors } from "@starknet-react/core";
import { addressShortener } from '../utils/addressShortener';

export const Navbar = () => {
    const { account, address, status } = useAccount();
    const { connect, connectors } = useConnectors();

    return (
        <header className="z-50 flex w-full py-2 text-sm bg-transparent px-28">
            <nav
                className="flex items-center justify-between w-full px-3 mx-auto"
                aria-label="Global"
            >


                
                <button
                        type="button"
                        className="inline-flex items-center px-4 py-3 ml-auto mr-1 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none"
                        data-hs-overlay="#hs-vertically-centered-modal"
                        onClick={() => connect(connectors[1])}
                    >
                        {address ? addressShortener(address) : "Connect Wallet"}
                    </button>


            </nav>
            </header>
    )
}