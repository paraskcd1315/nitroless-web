import React, { useState } from 'react'
import ReactSquircle from 'react-squircle';

import { useDispatch, useSelector } from 'react-redux';

import './Emotes.css'
import useWindowDimensions from '../../customHooks/WindowDimensions/useWindowDimensions';
import { addToFrequentlyUsed, removeRepository, setInactiveAllRepositories } from '../repos/reposSlice';
import useLongPress from '../../customHooks/LongPress/useLongPress';
import { selectedEmote } from '../contextMenu/contextMenuSlice';

const Emotes = ({ openSidebar, setOpenSidebar, setHomeActive, setContextMenuActive }) => {
    const { width } = useWindowDimensions();
    const allRepos = useSelector(state => state.repos.allRepos);
    const url = useSelector(state => state.emotes.url);
    const urlData = useSelector(state => state.emotes.urlData);
    const favourites = useSelector(state => state.emotes.favourites);
    const frequentlyUsed = useSelector(state => state.repos.frequentlyUsed);
    const [isDownloadsActive, setIsDownloadsActive] = useState(false);
    const [isAboutActive, setIsAboutActive] = useState(false);
    const [isHomeActive, setIsHomeActive] = useState(true);

    // TODO
    // const [ showCopyFeedback, setShowCopyFeedback ] = useState(false);

    const longPressProps = useLongPress({
        onClick: (e) => {
            const copyText = e.target.lastChild.lastChild.lastChild.src;
            window.navigator.clipboard.writeText(copyText);
            dispatch(addToFrequentlyUsed(copyText))
        },
        onLongPress: (e) => {
            if(e.target.parentNode !== "frequentlyUsedEmotesContainer") {
                return;
            }
            const userAgent = window.navigator.userAgent;
            const iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
            const webkit = !!userAgent.match(/WebKit/i);
            if(iOS && webkit && !userAgent.match(/CriOS/i)) {
                let emoteURL = e.target.lastChild.lastChild.lastChild.src.split('/')
                let emote = emoteURL[emoteURL.length - 1].split('.');
                dispatch(selectedEmote({
                    name: emote[0], type: emote[1]
                }));
                setContextMenuActive(true);
            }
        },
      });
    
    const dispatch = useDispatch();

    if(urlData && Object.keys(urlData).length === 0 && Object.getPrototypeOf(urlData) === Object.prototype) {
        return (
            <div className='Home'>
                <div className='pageHeader'>
                    <div className={`hamburgerMenu${openSidebar ? ' open' : ''}`} onClick={(e) => {
                        e.preventDefault();
                        setOpenSidebar(state => !state);
                    }}>
                        <div className="icon-left"></div>
                        <div className="icon-right"></div>
                    </div>
                    <h1 className="pageTitle">NITROLESS</h1>
                </div>
                <div className="urlContent">
                    <div className='navigation'>
                        <div className={`navItem${isHomeActive ? ' active' : ''}`} onClick={(e) => {
                            e.preventDefault();

                            setIsDownloadsActive(false);
                            setIsAboutActive(false);
                            setIsHomeActive(true)
                        }}>
                            <span className='navItemName'>Home</span>
                        </div>
                        <div className={`navItem${isAboutActive ? ' active' : ''}`} onClick={(e) => {
                            e.preventDefault();

                            setIsDownloadsActive(false);
                            setIsAboutActive(true);
                            setIsHomeActive(false)
                        }}>
                            <span className='navItemName'>About</span>
                        </div>
                        <div className={`navItem${isDownloadsActive ? ' active' : ''}`} onClick={(e) => {
                            e.preventDefault();

                            setIsDownloadsActive(true);
                            setIsAboutActive(false);
                            setIsHomeActive(false)
                        }}>
                            <span className='navItemName'>Downloads</span>
                        </div>
                    </div>
                    {
                    isHomeActive 
                    ?
                        (
                        <div className='HomeContainer'>
                            <div className='frequentlyUsedEmotes'>
                                <h1><i className="fa fa-history"></i> Frequently used Emotes</h1>
                                <div className='frequentlyUsedEmotesContainer' style={frequentlyUsed.length < 1 ? {display: 'flex'} : {}}>
                                        {
                                            frequentlyUsed.length > 0 ? frequentlyUsed.map((emote, index) => {
                                                return (
                                                    <div key={index} id={emote} className='emoteContainer' {...longPressProps} >
                                                        <div className='emoteImageContainer'>
                                                            <ReactSquircle imageUrl={emote} alt={emote.split('/')[emote.split('/').length - 1].split('.')[0]} width={48} height={48} />
                                                        </div>
                                                    </div>
                                                )
                                            }) : (<p>Start using Nitroless to show your frequently used emotes here.</p>)
                                        }
                                </div>
                            </div>
                            
                            {
                                allRepos.map((repo, index) => {
                                    return repo.favourites && repo.favourites.length > 0 ? (
                                        <div key={index} className='favouriteEmotes'>
                                            <h1><i className="fa fa-star"></i> {repo.data.name}'s Favourite Emotes</h1>
                                            <div className='favouriteEmotesContainer'>
                                                {
                                                    repo.favourites.map((emote, indexx) => {
                                                        return (
                                                            <div key={index + indexx} id={repo.url} className='emoteContainer' {...longPressProps} >
                                                                <div className='emoteImageContainer'>
                                                                    <ReactSquircle imageUrl={repo.data.path !== '' ? repo.url + '/' + repo.data.path + '/' + emote.name + '.' + emote.type : repo.url + '/' + emote.name + '.' + emote.type} alt={emote.name} width={48} height={48} />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    ) : ""
                                })
                            }
                        </div>
                        )
                    :
                        ""
                    }
                    {
                    isAboutActive
                    ?
                        (<div className='AboutContainer'>
                            <div className='About'>
                                <h1><i className="fa fa-info-circle"></i> About</h1>
                                <p>Nitroless is a small open source project made by students to help people without Nitro be able to use the community's Emotes to be used in discord. Nitroless is entirely community based requiring the community to make repositories where they can insert their own emotes and share them back to the community. The community uses this service by clicking/tapping on the image and it gets copied in their system's clipboard, allowing them to paste the Emote URL in Discord for the people to see.</p>
                            </div>
                            <div className='Socials'>
                                <div className='socials Github' onClick={(e) => window.location.href = "https://github.com/Nitroless"}>
                                    <i className='fa fa-github'></i>
                                    <span>Github </span>
                                </div>
                                <div className='socials Link' onClick={(e) => window.location.href = "https://nitroless.github.io/"}>
                                    <i className='fa fa-link'></i>
                                    <span>Website </span>
                                </div>
                                <div className='socials Twitter' onClick={(e) => window.location.href = "https://twitter.com/nitroless_"}>
                                    <i className='fa fa-twitter'></i>
                                    <span>Twitter </span>
                                </div>
                            </div>
                            <div className='Credits'>
                                <h1><i className="fa fa-info-circle"></i> Credits</h1>

                                <div className='credits' style={{marginBottom: "2rem"}}>
                                    <div className='header'>
                                        <img src="https://github.com/TheAlphaStream.png" alt="Alpha_Stream" />
                                        <div className='text'>
                                            <span className='title'>Alpha_Stream</span>
                                            <span className='sub'>Founder and Designer</span>
                                            <div className='Subtitles'>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://alphastream.weebly.com/"}>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://github.com/TheAlphaStream/"}>
                                                    <i className='fa fa-github'></i>
                                                    <span>TheAlphaStream</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://twitter.com/Kutarin_/"}>
                                                    <i className='fa fa-twitter'></i>
                                                    <span>@Kutarin_</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='credits' style={{marginBottom: "2rem"}}>
                                    <div className='header'>
                                        <img src="https://github.com/paraskcd1315.png" alt="Paras KCD" />
                                        <div className='text'>
                                            <span className='title'>Paras KCD</span>
                                            <span className='sub'>Web and macOS Developer</span>
                                            <div className='Subtitles'>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://paraskcd.com/"}>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://github.com/paraskcd1315/"}>
                                                    <i className='fa fa-github'></i>
                                                    <span>paraskcd1315</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://twitter.com/ParasKCD"}>
                                                    <i className='fa fa-twitter'></i>
                                                    <span>@ParasKCD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='credits' style={{marginBottom: "2rem"}}>
                                    <div className='header'>
                                        <img src="https://github.com/llsc12.png" alt="llsc12" />
                                        <div className='text'>
                                            <span className='title'>LLSC12</span>
                                            <span className='sub'>iOS and macOS Developer</span>
                                            <div className='Subtitles'>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://llsc12.github.io/"}>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://github.com/llsc12/"}>
                                                    <i className='fa fa-github'></i>
                                                    <span>llsc12</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://twitter.com/llsc121"}>
                                                    <i className='fa fa-twitter'></i>
                                                    <span>@llsc121</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='credits' style={{marginBottom: "2rem"}}>
                                    <div className='header'>
                                        <img src="https://github.com/Superbro9.png" alt="Superbro" />
                                        <div className='text'>
                                            <span className='title'>Superbro</span>
                                            <span className='sub'>iOS and macOS Adviser, Quality Control</span>
                                            <div className='Subtitles'>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://github.com/Superbro9/"}>
                                                    <i className='fa fa-github'></i>
                                                    <span>Superbro9</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://twitter.com/suuperbro/"}>
                                                    <i className='fa fa-twitter'></i>
                                                    <span>@suuperbro</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='credits' style={{marginBottom: "1rem"}}>
                                    <div className='header'>
                                        <img src="https://github.com/LillieH001.png" alt="Lillie" />
                                        <div className='text'>
                                            <span className='title'>Lillie</span>
                                            <span className='sub'>Windows Developer</span>
                                            <div className='Subtitles'>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://lillieh001.github.io/"}>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://github.com/LillieH001/"}>
                                                    <i className='fa fa-github'></i>
                                                    <span>LillieH001</span>
                                                </div>
                                                <div className='subtitles' onClick={(e) => window.location.href = "https://twitter.com/LillieWeeb/"}>
                                                    <i className='fa fa-twitter'></i>
                                                    <span>@LillieWeeb</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    :
                        ""
                    }
                    {
                    isDownloadsActive
                    ?
                        (<div className='DownloadsContainer'>
                            Under construction, come back later ;)
                        </div>)
                    :
                        ""
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='pageHeader'>
                    <div className={`hamburgerMenu${openSidebar ? ' open' : ''}`} onClick={(e) => {
                        e.preventDefault();
                        setOpenSidebar(state => !state);
                    }}>
                        <div className="icon-left"></div>
                        <div className="icon-right"></div>
                    </div>
                    {width <= 560 ? 
                        (
                            <h1 className="pageTitle">NITROLESS</h1>
                        ) :
                        ('')
                    }
                </div>
                <div className='urlContent'>
                    <div className='emotesHeader'>
                        <ReactSquircle imageUrl={url + urlData.icon} alt={urlData.name} width={64} height={64} className='repoImage' />
                        <h1 className='repoName'>{urlData.name}</h1>
                    </div>
                    <div className='urlDetails'>
                        <h1>Details</h1>
                        <p>URL: <a href={url}>{url}</a></p>
                        <p>Number of Emotes: {urlData.emotes.length}</p>
                        <button className='btn' onClick={(e) => {
                            e.preventDefault();
                            if(window.navigator.share && width <= 560) {
                                window.navigator.share({
                                    title: urlData.name,
                                    text: `Checkout the awesome Nitroless Repo - ${urlData.name} ${url}`,
                                })
                                .then(() => console.log('Shared Successfully'))
                                .catch((err) => console.error('DEBUG', err));
                            } else {
                                window.navigator.clipboard.writeText(`Checkout the awesome Nitroless Repo - ${urlData.name} ${url}`);
                            }
                        }}>Share</button>
                        <button className='btn danger' onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeRepository(url));
                            dispatch(setInactiveAllRepositories());
                            setHomeActive(true);
                        }}>Remove</button>
                    </div>
                    <div className='emotesContent'>
                        <div className='emotesContainer'>
                        {
                            urlData.emotes.map((emote, index) => {
                                return (
                                    <div key={index} id={url} urlPath={urlData.path} className='emoteContainer' {...longPressProps} >
                                        <div className='emoteImageContainer'>
                                            <ReactSquircle imageUrl={urlData.path !== '' ? url + urlData.path + '/' + emote.name + '.' + emote.type : url + emote.name + '.' + emote.type} alt={emote.name} width={48} height={48} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    {favourites && favourites.length > 0 ? (
                        <div className='favouriteEmotes'>
                            <h1><i className="fa fa-star"></i> Favourite Emotes</h1>
                            <div className='favouriteEmotesContainer'>
                            {
                                favourites.map((emote, index) => {
                                    return (
                                        <div key={index} id={url} className='emoteContainer' {...longPressProps} >
                                            <div className='emoteImageContainer'>
                                                <ReactSquircle imageUrl={urlData.path !== '' ? url + urlData.path + '/' + emote.name + '.' + emote.type : url + emote.name + '.' + emote.type} alt={emote.name} width={48} height={48} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    ) : ""}
                </div>
            </div>
        )
    }
}

export default Emotes