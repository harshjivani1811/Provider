"use client"

import { getProvider, getProviderList } from "@/action/provider";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useDispatch } from "react-redux";
import "./main.css";

const MainPageContainer = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [providerList, setProviderList] = useState([]);
    const [providers, setProviders] = useState();
    const [expandedItem, setExpandedItem] = useState(null);
    const [providerKey, setProviderKey] = useState();
    const [isMainPage, setIsMainPage] = useState(false);
    const [singleProvider, setSingleProvider] = useState();

    const dispatch = useDispatch();

    const openSidebar = async () => {
        const res = await dispatch(getProviderList());
        setProviderList(res?.payload?.data?.data)
        setIsSidebarOpen(true)
        setExpandedItem(null)
    }

    const onClose = () => {
        setIsSidebarOpen(false);
    };

    const onProviderClick = async (p) => {
        const res = await dispatch(getProvider(p));
        setProviders(res?.payload?.data?.apis);
        setProviderKey(Object.keys(res?.payload?.data?.apis));
        setExpandedItem(expandedItem === p ? null : p);
    }

    const handleProviderClick = async (providerInfo) => {
        setIsSidebarOpen(false);
        setIsMainPage(true);
        setSingleProvider(providerInfo);
    }

    return (
        <>
            <div className="as-provider-container">
                {isMainPage && (
                    <div className="flex flex-col justify-center [align-items:center]">
                        <div className="flex flex-col justify-center w-[100vh] [align-items:center]">
                            <div className="flex [align-items:center] mt-5">
                                <img className="w-10 h-10 mr-2" src={singleProvider?.info["x-logo"]?.url} alt="" />
                                <p className="as-provider-info-heading">{singleProvider?.info?.title}</p>
                            </div>
                            <div className="justify-center mt-3">
                                <p className="as-provider-info-heading">Description</p>
                                <p className="as-provider-info-text">{singleProvider?.info?.description}</p>
                                <p className="as-provider-info-heading mt-2">Swaggar</p>
                                <p className="as-provider-info-text">{singleProvider?.swaggerUrl}</p>
                                <p className="as-provider-info-heading mt-2">Contact</p>
                                <p>Email <b>{singleProvider?.info?.contact?.email}</b></p>
                                <p>Name <b>{singleProvider?.info?.contact?.name}</b></p>
                                <p>Url <b>{singleProvider?.info?.contact?.url}</b></p>

                            </div>
                        </div>
                        <div className="[margin-top:100px]">
                            <Button type="primary" onClick={openSidebar}> Explore web APIs </Button>
                        </div>
                    </div>
                )}
                {!isMainPage && (
                    <div className="flex justify-center [align-items:center] h-[100vh]">
                        <Button type="primary" onClick={openSidebar}> Explore web APIs </Button>
                    </div>
                )}
                <Drawer
                    title="Select Provider"
                    closable={false}
                    onClose={onClose}
                    open={isSidebarOpen}
                >
                    {(providerList && providerList.length > 0) &&
                        providerList.map((p, index) => {
                            return (
                                <>
                                    <div className={`${expandedItem === p ? "" : "as-provider-options"}as-provider-options flex flex-col justify-between pl-1 pr-1`}
                                        key={index}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => onProviderClick(p)}
                                    >
                                        <div className="flex items-center mt-3 justify-between">
                                            <p className="" key={index}>{p}</p>
                                            {expandedItem === p ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                                        </div>
                                        {expandedItem === p && (
                                            <div className="">
                                                {providerKey.map((pk, index) => {
                                                    return (
                                                        <>
                                                            <div
                                                                className="flex mt-2 mb-2"
                                                                onClick={() => handleProviderClick(providers[pk])}
                                                                style={{ cursor: 'pointer' }}
                                                                key={index}
                                                            >
                                                                <img className="w-5 h-5 mr-1"
                                                                    src={providers[pk]?.info["x-logo"]?.url}
                                                                    alt=""
                                                                />
                                                                <p>{providers[pk].info.title}</p>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )
                        })
                    }
                </Drawer>
            </div>
        </>
    )
}

export default MainPageContainer;