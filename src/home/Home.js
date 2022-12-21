import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { addEmoteToFrequentlyUsed, setCopiedFalse, setCopiedTrue } from '../app/viewModel';
import AppStoreImg from '../assets/images/downloads/AppStore.svg';
import MacStoreImg from '../assets/images/downloads/MacStore.svg';
import WindowsImg from '../assets/images/downloads/WindowsBadge.svg';

import './Home.css'

const Home = ({homeActive, aboutActive, downloadActive}) => {
    const dispatch = useDispatch();
    const frequentlyUsed = useSelector((state) => state.viewModel.frequentlyUsed);
    const favouriteEmotes = useSelector((state) => state.viewModel.favouriteEmotes);
    const [emoteLoaded, setEmoteLoaded] = useState(false);
    
    return (
        <div className='home'>
            {
                homeActive 
                ?
                (
                    <>
                        {
                            favouriteEmotes && favouriteEmotes.length > 0
                            ?
                            (
                                <div className="container">
                                    <div className="title">
                                        <i className="fa-solid fa-star"></i>
                                        <span>Favourite Emotes</span>
                                    </div>
                                    <div className="content emotes">
                                        {
                                            favouriteEmotes.map((emote) => {
                                                return (
                                                    <div 
                                                        key={emote} 
                                                        className='emoteContainer' 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(setCopiedTrue());
                                                            setTimeout(async () => {
                                                                await window.navigator.clipboard.writeText(emote);
                                                                dispatch(addEmoteToFrequentlyUsed({ emote: emote }));
                                                            });
                                                            setTimeout(() => {
                                                                dispatch(setCopiedFalse());
                                                            }, 1200);
                                                        }}
                                                    >
                                                        <ClipLoader
                                                            color="#5865F2"
                                                            loading={!emoteLoaded}
                                                            speedMultiplier={0.4}
                                                        />
                                                        <img src={ emote } alt={ emote } className="emote" style={ emoteLoaded ? {} : { display: 'none' } } onLoad={ () => setEmoteLoaded(true) } />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                            :
                            ""
                        }
                        <div className="container">
                            <div className="title">
                                <i className="fa-solid fa-clock-rotate-left"></i>
                                <span>Frequently Used Emotes</span>
                            </div>
                            <div className="content emotes">
                                {
                                    frequentlyUsed.length === 0
                                    ?
                                    (<span><br />Start using nitroless to show your frequently used emotes here.</span>)
                                    :
                                    frequentlyUsed.map((emote) => {
                                        return (
                                            <div 
                                                key={emote} 
                                                className='emoteContainer' 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(setCopiedTrue());
                                                    setTimeout(async () => {
                                                        await window.navigator.clipboard.writeText(emote);
                                                        dispatch(addEmoteToFrequentlyUsed({ emote: emote }));
                                                    });
                                                    setTimeout(() => {
                                                        dispatch(setCopiedFalse());
                                                    }, 1200);
                                                }}
                                            >
                                                <ClipLoader
                                                    color="#5865F2"
                                                    loading={!emoteLoaded}
                                                    speedMultiplier={0.4}
                                                />
                                                <img src={ emote } alt={ emote } className="emote" style={ emoteLoaded ? {} : { display: 'none' } } onLoad={ () => setEmoteLoaded(true) } />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                )
                :
                ""
            }
            {
                aboutActive
                ?
                (
                    <>
                        <div className='container'>
                            <div className="title">
                                <i className="fa-solid fa-circle-info"></i>
                                <span>About</span>
                            </div>
                            <div className="content">
                                <p>
                                    Nitroless is a small open source project made by students to help people without Nitro be able to use the community's Emotes to be used in discord. Nitroless is entirely community based requiring the community to make repositories where they can insert their own emotes and share them back to the community. The community uses this service by clicking/tapping on the image and it gets copied in their system's clipboard, allowing them to paste the Emote URL in Discord for the people to see.
                                </p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="title">
                                <i className="fa-solid fa-link"></i>
                                <span>Links</span>
                            </div>
                            <div className="content socials">
                                <div className="socialBrand github" onClick={(e) => window.open("https://github.com/Nitroless", '_blank').focus() }>
                                    <i className="fa-brands fa-github"></i>
                                    GitHub
                                </div>
                                <div className="socialBrand source" onClick={(e) => window.open("https://github.com/Nitroless/nitroless.github.io", '_blank').focus() }>
                                    <i className="fa-solid fa-link"></i>
                                    Source Code
                                </div>
                                <div className="socialBrand source" onClick={(e) => window.open("https://twitter.com/nitroless_", '_blank').focus() }>
                                    <i className="fa-brands fa-twitter"></i>
                                    Twitter
                                </div>
                                <div className="socialBrand source" onClick={(e) => window.open("https://discord.gg/y4GVrRTWPv", '_blank').focus() }>
                                    <i className="fa-brands fa-discord"></i>
                                    Discord
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="title">
                                <i className="fa-solid fa-circle-info"></i>
                                <span>Credits</span>
                            </div>
                            <div className="content credits">
                                <br />
                                <div className="credit Alpha">
                                    <div className='creditContainer'>
                                        <img src="https://github.com/TheAlphaStream.png" alt="Alpha_Stream" />
                                        <div className='creditInformation'>
                                            <span className='creditUserName'>Alpha_Stream</span>
                                            <span className='creditByLine'>Founder and Designer</span>
                                            <div className='creditLinks'>
                                                <div className='creditLink' onClick={ (e) => window.open("https://alphastream.weebly.com/", '_blank').focus() }>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.open("https://github.com/TheAlphaStream/", '_blank').focus() }>
                                                    <i className='fa-brands fa-github'></i>
                                                    <span>TheAlphaStream</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.open("https://twitter.com/Kutarin_/", '_blank').focus() }>
                                                    <i className='fa-brands fa-twitter'></i>
                                                    <span>@Kutarin_</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="credit ParasKCD">
                                    <div className='creditContainer'>
                                        <img src="https://github.com/paraskcd1315.png" alt="ParasKCD" />
                                        <div className='creditInformation'>
                                            <span className='creditUserName'>ParasKCD</span>
                                            <span className='creditByLine'>Web, Electron, iOS and macOS Developer</span>
                                            <div className='creditLinks'>
                                                <div className='creditLink' onClick={(e) => window.open("https://paraskcd.com/", '_blank').focus() }>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.open("https://github.com/paraskcd1315/", '_blank').focus() }>
                                                    <i className='fa-brands fa-github'></i>
                                                    <span>paraskcd1315</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.open("https://twitter.com/ParasKCD", '_blank').focus() }>
                                                    <i className='fa-brands fa-twitter'></i>
                                                    <span>@ParasKCD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="credit LLSC12">
                                    <div className='creditContainer'>
                                        <img src="https://github.com/llsc12.png" alt="llsc12" />
                                        <div className='creditInformation'>
                                            <span className='creditUserName'>LLSC12</span>
                                            <span className='creditByLine'>iOS and macOS Developer</span>
                                            <div className='creditLinks'>
                                                <div className='creditLink' onClick={(e) => window.open("https://llsc12.github.io/", '_blank').focus() }>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.open("https://github.com/llsc12/", '_blank').focus() }>
                                                    <i className='fa-brands fa-github'></i>
                                                    <span>llsc12</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.open("https://twitter.com/llsc121", '_blank').focus() }>
                                                    <i className='fa-brands fa-twitter'></i>
                                                    <span>@llsc121</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="credit Superbro">
                                    <div className='creditContainer'>
                                        <img src="https://github.com/Superbro9.png" alt="Superbro" />
                                        <div className='creditInformation'>
                                            <span className='creditUserName'>Superbro</span>
                                            <span className='creditByLine'>iOS and macOS Adviser, Quality Control</span>
                                            <div className='creditLinks'>
                                                <div className='creditLink' onClick={(e) => window.open("https://github.com/Superbro9/", '_blank').focus() }>
                                                    <i className='fa-brands fa-github'></i>
                                                    <span>Superbro9</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.open("https://twitter.com/suuperbro/", '_blank').focus() }>
                                                    <i className='fa-brands fa-twitter'></i>
                                                    <span>@suuperbro</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
                :
                ""
            }
            {
                downloadActive
                ?
                (
                    <div className="container">
                        <div className="title">
                            <i className="fa-solid fa-circle-info"></i>
                            <span>Downloads</span>
                        </div>
                        <div className="content Downloads">
                            <p>Right click on the badges below for your preferred system and click open in new tab.</p>
                            <br />
                            <a href="https://apps.apple.com/ca/app/nitroless/id6444032757"><img src={AppStoreImg} alt="appstore" className='downloads' /></a>
                            <a href="https://apps.apple.com/ca/app/nitroless/id6444032757"><img src={MacStoreImg} alt="appstore" className='downloads' /></a>
                            <a href='https://play.google.com/store/apps/details?id=com.paraskcd.nitroless&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' className='downloads playStore'/></a>
                            <a href="https://github.com/Nitroless/nitroless-electron/releases/"><img src={WindowsImg} alt="windows" className='downloads' /></a>
                        </div>
                    </div>
                )
                :
                ""
            }
        </div>
    )
}

export default Home