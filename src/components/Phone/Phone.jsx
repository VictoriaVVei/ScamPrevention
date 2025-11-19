import React, { useEffect, useRef, useState, useMemo } from "react";
import styles from "./Phone.module.css";

import mailData from "../../data/mail.json";
import wechatData from "../../data/wechat.json";
import tinderData from "../../data/tinder.json";
import messagesData from "../../data/messages.json";
import photosData from "../../data/photos.json";

import { useScamContext } from "../../assets/ScamContext.jsx";

const LONG_PRESS_MS = 600;
export function Phone({ externalView, onCloseExternalView, onSaveSuccess, onTimeUp, totalSeconds = 300 }) {
    //----------------------------------------------
    // Domain
    //--------------------------------------------------
    const domain =
        process.env.NODE_ENV === "development"
            ? "http://localhost:4000"
            : "http://localhost:4000";
    //----------------------------------------------

    //----------------------------------------------
    // Var
    //--------------------------------------------------
    const MailSvg = (props) => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.3331 9.33325L17.3453 16.9692C16.9385 17.2055 16.4764 17.3299 16.0059 17.3299C15.5355 17.3299 15.0734 17.2055 14.6666 16.9692L2.66675 9.33325" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M26.6665 5.33325H5.33339C3.86064 5.33325 2.66675 6.52715 2.66675 7.99989V23.9997C2.66675 25.4725 3.86064 26.6664 5.33339 26.6664H26.6665C28.1393 26.6664 29.3331 25.4725 29.3331 23.9997V7.99989C29.3331 6.52715 28.1393 5.33325 26.6665 5.33325Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );

    const WeChatSvg = (props) => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5656 11.7938C21.75 11.7938 21.9344 11.8 22.1156 11.8094C21.3531 7.78752 17.1687 4.71252 12.1187 4.71252C6.53125 4.71252 2 8.48128 2 13.1313C2 15.6657 3.3625 17.95 5.49687 19.4938C5.66875 19.6156 5.78125 19.8157 5.78125 20.0438C5.78125 20.1188 5.76562 20.1875 5.74687 20.2594C5.575 20.8938 5.30313 21.9094 5.29063 21.9563C5.26875 22.0375 5.2375 22.1188 5.2375 22.2031C5.2375 22.3875 5.3875 22.5406 5.575 22.5406C5.64687 22.5406 5.70625 22.5125 5.76875 22.4781L7.98438 21.2C8.15 21.1032 8.32813 21.0438 8.52188 21.0438C8.62188 21.0438 8.72188 21.0594 8.81875 21.0875C9.85313 21.3844 10.9688 21.55 12.1219 21.55C12.3094 21.55 12.4938 21.5469 12.6781 21.5375C12.4563 20.8813 12.3375 20.1906 12.3375 19.475C12.3375 15.2313 16.4687 11.7938 21.5656 11.7938ZM15.4937 9.09065C16.2375 9.09065 16.8438 9.69377 16.8438 10.4375C16.8438 11.1813 16.2406 11.7844 15.4937 11.7844C14.75 11.7844 14.1438 11.1813 14.1438 10.4375C14.1438 9.69377 14.75 9.09065 15.4937 9.09065ZM8.74687 11.7844C8.00312 11.7844 7.39687 11.1813 7.39687 10.4375C7.39687 9.69377 8 9.09065 8.74687 9.09065C9.49375 9.09065 10.0969 9.69377 10.0969 10.4375C10.0969 11.1813 9.49062 11.7844 8.74687 11.7844Z" fill="white" />
            <path d="M27.0844 24.7719C28.8625 23.4844 29.9969 21.5844 29.9969 19.4688C29.9969 15.5938 26.2219 12.4531 21.5625 12.4531C16.9063 12.4531 13.1282 15.5938 13.1282 19.4688C13.1282 23.3438 16.9032 26.4844 21.5625 26.4844C22.525 26.4844 23.4563 26.3469 24.3157 26.1C24.3969 26.075 24.4782 26.0625 24.5625 26.0625C24.725 26.0625 24.8719 26.1125 25.0094 26.1906L26.8563 27.2531C26.9094 27.2844 26.9594 27.3062 27.0188 27.3062C27.0938 27.3062 27.1657 27.2781 27.2188 27.225C27.2719 27.1719 27.3 27.1 27.3 27.025C27.3 26.9562 27.2719 26.8875 27.2563 26.8188C27.2469 26.7812 27.0188 25.9344 26.875 25.4031C26.8594 25.3438 26.8469 25.2844 26.8469 25.225C26.85 25.0406 26.9438 24.875 27.0844 24.7719ZM18.7563 18.35C18.1344 18.35 17.6313 17.8469 17.6313 17.2281C17.6313 16.6094 18.1344 16.1063 18.7563 16.1063C19.3782 16.1063 19.8813 16.6094 19.8813 17.2281C19.8813 17.8469 19.375 18.35 18.7563 18.35ZM24.3782 18.35C23.7563 18.35 23.2532 17.8469 23.2532 17.2281C23.2532 16.6094 23.7563 16.1063 24.3782 16.1063C25 16.1063 25.5032 16.6094 25.5032 17.2281C25.5 17.8469 24.9969 18.35 24.3782 18.35Z" fill="white" />
        </svg>

    );

    const TinderSvg = (props) => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66675 12.6666C2.66678 11.1828 3.11687 9.73404 3.95758 8.51149C4.79829 7.28894 5.99007 6.35017 7.37551 5.81917C8.76095 5.28816 10.2749 5.1899 11.7173 5.53736C13.1598 5.88482 14.4629 6.66167 15.4546 7.76528C15.5245 7.83997 15.6089 7.89951 15.7027 7.94021C15.7965 7.98092 15.8977 8.00192 15.9999 8.00192C16.1022 8.00192 16.2034 7.98092 16.2972 7.94021C16.391 7.89951 16.4754 7.83997 16.5453 7.76528C17.5339 6.65449 18.8373 5.87112 20.2821 5.51944C21.7269 5.16775 23.2445 5.26443 24.633 5.79661C26.0215 6.32879 27.215 7.27122 28.0546 8.49848C28.8943 9.72573 29.3402 11.1796 29.3331 12.6666C29.3331 15.7199 27.3332 17.9998 25.3332 19.9998L18.0106 27.0838C17.7622 27.3691 17.4558 27.5983 17.112 27.7561C16.7682 27.914 16.3947 27.9969 16.0163 27.9993C15.638 28.0017 15.2635 27.9235 14.9177 27.77C14.5719 27.6166 14.2627 27.3913 14.0106 27.1091L6.66671 19.9998C4.66673 17.9998 2.66675 15.7332 2.66675 12.6666Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );

    const BankSvg = (props) => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 15.9998H18.6665" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.3333 10.6666H18.6665" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.6665 27.9997V23.9998C18.6665 23.2925 18.3856 22.6143 17.8855 22.1142C17.3854 21.6141 16.7071 21.3331 15.9999 21.3331C15.2927 21.3331 14.6144 21.6141 14.1143 22.1142C13.6142 22.6143 13.3333 23.2925 13.3333 23.9998V27.9997" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.00003 13.3332H5.33339C4.62615 13.3332 3.94788 13.6142 3.44779 14.1143C2.9477 14.6143 2.66675 15.2926 2.66675 15.9999V25.3331C2.66675 26.0403 2.9477 26.7186 3.44779 27.2187C3.94788 27.7188 4.62615 27.9997 5.33339 27.9997H26.6665C27.3737 27.9997 28.052 27.7188 28.5521 27.2187C29.0522 26.7186 29.3331 26.0403 29.3331 25.3331V11.9999C29.3331 11.2927 29.0522 10.6144 28.5521 10.1143C28.052 9.6142 27.3737 9.33325 26.6665 9.33325H23.9999" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 27.9997V6.66658C8 5.95934 8.28095 5.28107 8.78104 4.78098C9.28113 4.28089 9.9594 3.99994 10.6666 3.99994H21.3332C22.0404 3.99994 22.7187 4.28089 23.2188 4.78098C23.7189 5.28107 23.9998 5.95934 23.9998 6.66658V27.9997" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );

    const PhotosSvg = (props) => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.3331 3.99994H6.66664C5.1939 3.99994 4 5.19383 4 6.66658V25.3331C4 26.8058 5.1939 27.9997 6.66664 27.9997H25.3331C26.8059 27.9997 27.9998 26.8058 27.9998 25.3331V6.66658C27.9998 5.19383 26.8059 3.99994 25.3331 3.99994Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.9999 14.6665C13.4726 14.6665 14.6665 13.4726 14.6665 11.9999C14.6665 10.5271 13.4726 9.33325 11.9999 9.33325C10.5271 9.33325 9.33325 10.5271 9.33325 11.9999C9.33325 13.4726 10.5271 14.6665 11.9999 14.6665Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M27.9998 19.9998L23.8852 15.8852C23.3851 15.3853 22.707 15.1044 21.9999 15.1044C21.2928 15.1044 20.6146 15.3853 20.1145 15.8852L8 27.9997" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );

    const MusicSvg = (props) => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9998 23.9997V6.66658L27.9996 3.99994V21.3331" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.99996 27.9997C10.2091 27.9997 11.9999 26.2088 11.9999 23.9997C11.9999 21.7906 10.2091 19.9998 7.99996 19.9998C5.79084 19.9998 4 21.7906 4 23.9997C4 26.2088 5.79084 27.9997 7.99996 27.9997Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M23.9997 25.333C26.2088 25.333 27.9997 23.5422 27.9997 21.3331C27.9997 19.124 26.2088 17.3331 23.9997 17.3331C21.7906 17.3331 19.9998 19.124 19.9998 21.3331C19.9998 23.5422 21.7906 25.333 23.9997 25.333Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );

    const APPS = {
        HOME: "home",
        MAIL: "mail",
        WECHAT: "wechat",
        TINDER: "tinder",
        BANK: "bank",
        PHOTOS: "photos",
        MUSIC: "music",
        MESSAGES: "messages",
        SEARCH: "search",
        SCAMS_FOUND: "scams_found",
    };

    // Navigation & animation
    const [activeApp, setActiveApp] = useState(APPS.HOME);
    const [transitionDir, setTransitionDir] = useState("Left");
    const [animTick, setAnimTick] = useState(0);

    // Music player state
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Game countdown timer (wall-clock based, unaffected by app switching)
    const endAtRef = useRef(Date.now() + (Number.isFinite(totalSeconds) ? totalSeconds : 300) * 1000);
    const [timeLeftMs, setTimeLeftMs] = useState(() => Math.max(0, endAtRef.current - Date.now()));
    const timeUpFiredRef = useRef(false);

    // Long-press & modal state
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Img zoom in viewer
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);
    // Photos long-press helpers
    const photoPressTimerRef = useRef(null);
    const photoLongPressTriggeredRef = useRef(false);

    // Global context
    const { saveScamMessage, savedMessages, removeScamMessage, setCorrectScams } = useScamContext();

    // Remove-confirmation state & handlers
    const [removeConfirmOpen, setRemoveConfirmOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

    // UI maps
    const headerBgMap = {
        [APPS.BANK]: '#7e7de0ff',
        [APPS.MESSAGES]: '#00BC7D',
        [APPS.MAIL]: '#2B7FFF',
        [APPS.WECHAT]: '#00BC7D',
        [APPS.TINDER]: '#fc53ad',
        [APPS.SEARCH]: '',
        [APPS.PHOTOS]: '#dc9730',
        [APPS.SCAMS_FOUND]: '#18a193',

    };

    const titleMap = {
        [APPS.MAIL]: "Inbox",
        [APPS.WECHAT]: "WeChat",
        [APPS.TINDER]: "Tinder",
        [APPS.MESSAGES]: "Messages",
        [APPS.BANK]: "Bank",
        [APPS.PHOTOS]: "Photos",
        [APPS.MUSIC]: "Music",
        [APPS.SEARCH]: "Search",
        [APPS.SCAMS_FOUND]: "Scams FOUND",
    };
    //----------------------------------------------

    //----------------------------------------------
    // Func
    //--------------------------------------------------
    // Build one random selection for this round/session
    const limitedSelected = useMemo(() => {
        // Datasets per app
        const datasets = {
            [APPS.MAIL]: mailData || [],
            [APPS.WECHAT]: wechatData || [],
            [APPS.TINDER]: tinderData || [],
            [APPS.MESSAGES]: messagesData || [],
            [APPS.PHOTOS]: photosData || [],
        };

        // Per-app limits
        const limits = {
            [APPS.MAIL]: 5,
            [APPS.WECHAT]: 5,
            [APPS.TINDER]: 5,
            [APPS.MESSAGES]: 5,
            [APPS.PHOTOS]: 3,
        };

        // Only enforce global scam minimum across these apps
        const considerForMinimum = new Set([APPS.MAIL, APPS.WECHAT, APPS.TINDER, APPS.PHOTOS]);

        const selected = {};
        let scamCount = 0;
        const replaceSlots = []; // { app, index }
        const scamCandidates = []; // { app, item }

        const shuffleInPlace = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };

        for (const app of Object.keys(limits)) {
            const data = datasets[app] || [];
            const limit = limits[app] ?? data.length;
            const shuffled = shuffleInPlace(data.slice());
            const initial = shuffled.slice(0, limit);
            selected[app] = initial.slice();

            if (considerForMinimum.has(app)) {
                // Count scams and mark replaceable slots in current selection
                initial.forEach((it, idx) => {
                    if (it && it.isScam) scamCount++;
                    else replaceSlots.push({ app, index: idx });
                });
                // Gather extra scam candidates from leftovers
                for (let i = limit; i < shuffled.length; i++) {
                    const it = shuffled[i];
                    if (it && it.isScam) scamCandidates.push({ app, item: it });
                }
            }
        }

        // Ensure at least 5 scams across Mail/WeChat/Tinder/Photos by replacing non-scams
        const MIN_SCAMS_TOTAL = 5;
        while (scamCount < MIN_SCAMS_TOTAL && replaceSlots.length > 0 && scamCandidates.length > 0) {
            const slot = replaceSlots.shift();
            const cand = scamCandidates.shift();
            selected[slot.app][slot.index] = cand.item;
            scamCount++;
        }

        return selected;
    }, []);

    const setAppWithAnim = (nextApp, dir) => {
        let computed = dir;
        if (!computed) {
            if (nextApp !== APPS.HOME) {
                computed = "Right";
            }
            else if (nextApp === APPS.HOME) {
                computed = "Left";
            }
        }
        setTransitionDir(computed);
        setActiveApp(nextApp);
        setAnimTick((k) => k + 1);
    };

    // Start countdown once on mount; compute remaining from a fixed deadline to avoid drift
    useEffect(() => {
        const tick = () => {
            const ms = Math.max(0, endAtRef.current - Date.now());
            setTimeLeftMs(ms);
            if (ms <= 0 && !timeUpFiredRef.current) {
                timeUpFiredRef.current = true;
                try {
                    if (typeof onTimeUp === 'function') onTimeUp();
                } catch { }
            }
        };
        // Initial tick immediately to sync UI
        tick();
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Initialize audio once
    useEffect(() => {
        const audio = new Audio("/music/HE.m4a");
        audio.preload = "auto";
        const onLoadedMeta = () => {
            setDuration(isFinite(audio.duration) ? audio.duration : 0);
        };
        const onTimeUpdate = () => {
            setCurrentTime(isFinite(audio.currentTime) ? audio.currentTime : 0);
        };
        const onEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };
        audio.addEventListener("loadedmetadata", onLoadedMeta);
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("ended", onEnded);
        audioRef.current = audio;
        return () => {
            try {
                audio.pause();
            } catch { }
            audio.removeEventListener("loadedmetadata", onLoadedMeta);
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("ended", onEnded);
            audioRef.current = null;
        };
    }, []);

    // Pause when leaving MUSIC app
    useEffect(() => {
        if (activeApp !== APPS.MUSIC && audioRef.current) {
            audioRef.current.pause();
            // Reset to start for consistent UX when returning
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setCurrentTime(0);
        }
    }, [activeApp]);

    const handleMusicPlayPause = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (e) {
                // Autoplay policies or other errors
                console.warn("Audio play failed:", e);
                setIsPlaying(false);
            }
        }
    };

    const handleMusicPrev = () => {
        window.alert("Nomore previous songs");
    };

    const handleMusicNext = () => {
        window.alert("Nomore next songs");
    };

    const goHome = () => setAppWithAnim(APPS.HOME);

    const handleLongPressMessage = (message, sourceApp) => {
        setSelectedMessage({ ...message, sourceApp });
        setIsDialogOpen(true);
    };

    // Save confirm modal handlers
    const handleConfirmSave = () => {
        if (selectedMessage && saveScamMessage) {
            saveScamMessage(selectedMessage);
        }
        // Notify parent so it can show success.gif below main
        if (typeof onSaveSuccess === 'function') {
            try { onSaveSuccess(); } catch { }
        }
        setIsDialogOpen(false);
        setSelectedMessage(null);
    };

    const handleCancelSave = () => {
        setIsDialogOpen(false);
        setSelectedMessage(null);
    };

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setIsPhotoOpen(true);
    };

    const handleLongPressPhoto = (photo) => {
        // Reuse the same modal/save flow as messages
        setSelectedMessage({
            id: photo.id,
            title: "Photo",
            shortSummary: photo.shortSummary || "",
            icon: "🖼️",
            sourceApp: APPS.PHOTOS,
            type: photo.type || 'Tech',
        });
        setIsDialogOpen(true);
    };

    // Remove confirm modal handlers
    const handleRequestRemove = (e) => {
        // read identifiers from data- attributes on the clicked element
        const el = e.currentTarget;
        const sourceApp = el.dataset.sourceapp;
        const id = el.dataset.id;
        if (!sourceApp || !id) return;
        const key = `${sourceApp}-${id}`;
        const found = (savedMessages || []).find((m) => `${m.sourceApp}-${m.id}` === key);
        if (!found) return;
        setItemToRemove({ ...found, key });
        setRemoveConfirmOpen(true);
    };

    const handleCancelRemove = () => {
        setRemoveConfirmOpen(false);
        setItemToRemove(null);
    };

    const handleConfirmRemove = () => {
        if (itemToRemove && removeScamMessage) {
            removeScamMessage(itemToRemove.key);
        }
        setRemoveConfirmOpen(false);
        setItemToRemove(null);
    };

    const startPhotoPress = (photo) => () => {
        if (photoPressTimerRef.current) return;
        photoLongPressTriggeredRef.current = false;
        photoPressTimerRef.current = window.setTimeout(() => {
            photoLongPressTriggeredRef.current = true;
            handleLongPressPhoto(photo);
        }, LONG_PRESS_MS);
    };

    const cancelPhotoPress = () => {
        if (photoPressTimerRef.current) {
            window.clearTimeout(photoPressTimerRef.current);
            photoPressTimerRef.current = null;
        }
    };

    const handleClosePhoto = () => {
        setIsPhotoOpen(false);
        setSelectedPhoto(null);
    };

    // Renderers
    const renderHeader = () => {
        if (activeApp === APPS.HOME) {
            const totalSecondsLeft = Math.max(0, Math.floor(timeLeftMs / 1000));
            const mm = Math.floor(totalSecondsLeft / 60);
            const ss = String(totalSecondsLeft % 60).padStart(2, "0");
            return (
                <div className={styles.timerHeader}>
                    <div className={styles.timerHeader_wrapper}>
                        <div className={styles.timerIcon}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 2.66663H18.6665" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.9998 18.6665L19.9997 14.6665" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.9998 29.3331C21.8908 29.3331 26.6664 24.5575 26.6664 18.6665C26.6664 12.7755 21.8908 7.99994 15.9998 7.99994C10.1088 7.99994 5.33325 12.7755 5.33325 18.6665C5.33325 24.5575 10.1088 29.3331 15.9998 29.3331Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className={styles.timerTime}>{mm}:{ss}</div>
                    </div>

                    <div className={styles.timerSubtitle}>Time to Complete Game</div>
                </div>
            );
        }

        return (
            <div className={`${styles.appHeader} ${styles.appHeaderColored}`} style={{ backgroundColor: headerBgMap[activeApp] }}>
                <button className={styles.backButton} onClick={goHome}>
                    &lt; Back
                </button>
                <div className={styles.appTitle}>{titleMap[activeApp] || ""}</div>
            </div>
        );
    };

    const renderHome = () => (
        <>
            {renderHeader()}

            <div className={styles.appGrid}>
                <HomeIcon
                    label="Mail"
                    badge={5}
                    type="mail"
                    icon={<MailSvg />}
                    onClick={() => setAppWithAnim(APPS.MAIL)}
                />
                <HomeIcon
                    label="WeChat"
                    badge={5}
                    type="wechat"
                    icon={<WeChatSvg />}
                    onClick={() => setAppWithAnim(APPS.WECHAT)}
                />
                <HomeIcon
                    label="Tinder"
                    badge={5}
                    type="tinder"
                    icon={<TinderSvg />}
                    onClick={() => setAppWithAnim(APPS.TINDER)}
                />
                <HomeIcon
                    label="Bank"
                    type="bank"
                    icon={<BankSvg />}
                    onClick={() => setAppWithAnim(APPS.BANK)}
                />
                <HomeIcon
                    label="Photos"
                    type="photos"
                    icon={<PhotosSvg />}
                    onClick={() => setAppWithAnim(APPS.PHOTOS)}
                />
                <HomeIcon
                    label="Music"
                    type="music"
                    icon={<MusicSvg />}
                    onClick={() => setAppWithAnim(APPS.MUSIC)}
                />
            </div>

            <div className={styles.dock}>
                <button
                    className={`${styles.dockIcon} ${styles.dockChat}`}
                    onClick={() => setAppWithAnim(APPS.MESSAGES)}
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.3331 22.6665C29.3331 23.3737 29.0522 24.052 28.5521 24.5521C28.052 25.0522 27.3737 25.3331 26.6665 25.3331H9.10402C8.39684 25.3333 7.71868 25.6143 7.2187 26.1144L4.28273 29.0504C4.15034 29.1828 3.98167 29.2729 3.79806 29.3094C3.61444 29.346 3.42412 29.3272 3.25115 29.2556C3.07819 29.1839 2.93035 29.0626 2.82633 28.907C2.72231 28.7513 2.66677 28.5683 2.66675 28.3811V6.66664C2.66675 5.9594 2.9477 5.28113 3.44779 4.78104C3.94788 4.28095 4.62615 4 5.33339 4H26.6665C27.3737 4 28.052 4.28095 28.5521 4.78104C29.0522 5.28113 29.3331 5.9594 29.3331 6.66664V22.6665Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button
                    className={`${styles.dockIcon} ${styles.dockSearch}`}
                    onClick={() => setAppWithAnim(APPS.SEARCH)}
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.9997 27.9996L22.2131 22.213" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.6666 25.3331C20.5575 25.3331 25.3331 20.5575 25.3331 14.6666C25.3331 8.77558 20.5575 4 14.6666 4C8.77558 4 4 8.77558 4 14.6666C4 20.5575 8.77558 25.3331 14.6666 25.3331Z" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </>
    );

    const renderAppContent = () => {
        const progressPct = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
        const formatTime = (secs) => {
            if (!isFinite(secs) || secs < 0) return "0:00";
            const m = Math.floor(secs / 60);
            const s = Math.floor(secs % 60);
            return `${m}:${String(s).padStart(2, "0")}`;
        };

        // Use the precomputed random selections and scam-min enforcement
        const selectedPhotos = limitedSelected[APPS.PHOTOS] || [];
        switch (activeApp) {
            case APPS.HOME:
                return renderHome();

            // ===== Scams Found =====
            case APPS.SCAMS_FOUND:
                return (
                    <div style={{ height: "100%", backgroundColor: "white" }}>
                        <div className={`${styles.appHeader} ${styles.appHeaderColored}`} style={{ backgroundColor: '#18a193' }}>
                            <button className={styles.backButton} onClick={goHome}>
                                &lt; Back
                            </button>
                            <div className={styles.appTitle}>Scams FOUND</div>
                        </div>
                        <div className={styles.listScreen}>
                            {(!savedMessages || savedMessages.length === 0) && (
                                <div style={{ color: '#555', fontSize: "1rem", padding: '1rem', width: 'fit-content', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    Nothing flagged yet
                                </div>
                            )}
                            {savedMessages && savedMessages.map((m, idx) => (
                                <div style={{ display: "flex", flexDirection: "row", width: "100%", position: "relative" }}>
                                    <div key={idx} className={styles.msgRow} style={{ background: '#fff', flex: "1" }}>
                                        <div className={styles.msgIcon}>{m.icon || '⚠️'}</div>
                                        <div className={styles.msgContent}>
                                            <div className={styles.msgTitle}>{m.title || m.text || 'Untitled'}</div>
                                            {m.shortSummary && <div className={styles.msgText}>{m.shortSummary}</div>}
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeBar}
                                        data-sourceapp={m.sourceApp}
                                        data-id={m.id}
                                        onClick={handleRequestRemove}
                                    >
                                        x
                                    </button>
                                </div>

                            ))}
                        </div>
                    </div>
                );


            // ===== Music =====
            case APPS.MUSIC:
                return (
                    <div style={{ background: "linear-gradient(180deg, #18a193, #007669)", height: "100%" }}>
                        {renderHeader()}
                        <div className={styles.musicScreen}>
                            <div className={styles.musicCard}>
                                <div className={styles.musicNote}>🎵</div>
                            </div>

                            <div className={styles.musicTitle}>Happy Ending</div>
                            <div className={styles.musicSubtitle}>Victoria Wei</div>

                            <div className={styles.musicProgress}>
                                <div className={styles.musicProgressBar}>
                                    <div className={styles.musicProgressFill} style={{ width: `${progressPct}%` }} />
                                </div>
                                <div className={styles.musicProgressTime}>
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            <div className={styles.musicControls}>
                                <button className={styles.musicControlBtn} onClick={handleMusicPrev}>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9611 5.71327C24.3658 5.47048 24.8276 5.33942 25.2995 5.33346C25.7713 5.32751 26.2363 5.44688 26.647 5.67939C27.0576 5.91189 27.3992 6.2492 27.6369 6.65689C27.8745 7.06457 27.9998 7.52802 27.9998 7.99992V23.9998C27.9998 24.4717 27.8745 24.9351 27.6369 25.3428C27.3992 25.7505 27.0576 26.0878 26.647 26.3203C26.2363 26.5528 25.7713 26.6722 25.2995 26.6662C24.8276 26.6603 24.3658 26.5292 23.9611 26.2864L10.6319 18.2891C10.2362 18.0527 9.90859 17.7178 9.68094 17.317C9.45329 16.9162 9.33341 16.4632 9.33301 16.0023C9.33261 15.5414 9.45169 15.0882 9.67864 14.687C9.90559 14.2858 10.2327 13.9503 10.6279 13.7132L23.9611 5.71327Z" fill="white" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M4 26.6664V5.33325V26.6664Z" fill="white" />
                                        <path d="M4 26.6664V5.33325" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button className={styles.musicPlayBtn} onClick={handleMusicPlayPause} style={{ backgroundColor: "white" }}>
                                    {isPlaying ? (
                                        // Pause icon
                                        <svg t="1763519697863" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7724" width="32" height="32">
                                            <path d="M341.2992 142.2336c47.104 0 85.2992 38.1952 85.2992 85.2992v568.9344c0 47.104-38.1952 85.2992-85.2992 85.2992S256 843.5712 256 796.4672V227.5328c0-47.104 38.1952-85.2992 85.2992-85.2992z m341.4016 0c47.104 0 85.2992 38.1952 85.2992 85.2992v568.9344c0 47.104-38.1952 85.2992-85.2992 85.2992s-85.2992-38.1952-85.2992-85.2992V227.5328c-0.1024-47.104 38.0928-85.2992 85.2992-85.2992z" fill="#323233" p-id="7725"></path>
                                        </svg>
                                    ) : (
                                        // Play icon
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.6665 6.66658C6.66636 6.19737 6.79003 5.73643 7.02501 5.33031C7.25999 4.92418 7.59797 4.58725 8.00482 4.35353C8.41168 4.1198 8.87299 3.99757 9.3422 3.99916C9.8114 4.00075 10.2719 4.12612 10.6771 4.3626L26.673 13.6932C27.0766 13.9274 27.4118 14.2635 27.6449 14.6678C27.878 15.0722 28.0009 15.5306 28.0013 15.9973C28.0017 16.464 27.8796 16.9227 27.6472 17.3274C27.4148 17.7322 27.0802 18.0689 26.677 18.3038L10.6771 27.637C10.2719 27.8735 9.8114 27.9989 9.3422 28.0005C8.87299 28.0021 8.41168 27.8798 8.00482 27.6461C7.59797 27.4124 7.25999 27.0754 7.02501 26.6693C6.79003 26.2632 6.66636 25.8023 6.6665 25.3331V6.66658Z" fill="black" stroke="black" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    )}
                                </button>
                                <button className={styles.musicControlBtn} onClick={handleMusicNext}>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M27.9995 5.33325V26.6664V5.33325Z" fill="white" />
                                        <path d="M27.9995 5.33325V26.6664" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.03863 5.71327C7.63398 5.47048 7.17215 5.33942 6.70028 5.33346C6.22842 5.32751 5.76343 5.44688 5.35278 5.67939C4.94214 5.91189 4.60054 6.2492 4.36288 6.65689C4.12522 7.06457 4 7.52802 4 7.99992V23.9998C4 24.4717 4.12522 24.9351 4.36288 25.3428C4.60054 25.7505 4.94214 26.0878 5.35278 26.3203C5.76343 26.5528 6.22842 26.6722 6.70028 26.6662C7.17215 26.6603 7.63398 26.5292 8.03863 26.2864L21.3678 18.2891C21.7635 18.0527 22.0912 17.7178 22.3188 17.317C22.5465 16.9162 22.6663 16.4632 22.6667 16.0023C22.6671 15.5414 22.5481 15.0882 22.3211 14.687C22.0942 14.2858 21.7671 13.9503 21.3718 13.7132L8.03863 5.71327Z" fill="white" stroke="white" stroke-width="2.66664" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                );

            // ===== Photos =====
            case APPS.PHOTOS:
                return (
                    <div style={{ backgroundColor: "white", height: "100%" }}>
                        {renderHeader()}
                        <div className={styles.photosScreen}>
                            {selectedPhotos.map((photo) => (
                                <button
                                    key={photo.id}
                                    className={styles.photoItem}
                                    style={{ backgroundImage: `url(${photo.url})` }}
                                    onClick={(e) => {
                                        if (photoLongPressTriggeredRef.current) {
                                            // Swallow the click after a long press
                                            photoLongPressTriggeredRef.current = false;
                                            e.preventDefault();
                                            e.stopPropagation();
                                            return;
                                        }
                                        handlePhotoClick(photo);
                                    }}
                                    onMouseDown={startPhotoPress(photo)}
                                    onMouseUp={cancelPhotoPress}
                                    onMouseLeave={cancelPhotoPress}
                                    onTouchStart={startPhotoPress(photo)}
                                    onTouchEnd={cancelPhotoPress}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            ))}
                        </div>
                    </div>
                );

            // ===== Bank =====
            case APPS.BANK:
                return (
                    <div style={{ backgroundColor: "rgba(215, 223, 241, 1)", height: "100%" }}>
                        {renderHeader()}
                        <div className={styles.bankScreen}>
                            <svg viewBox="0 0 422 284" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_278_1279)">
                                    <g clip-path="url(#clip0_278_1279)">
                                        <path d="M38 37C38 23.7452 48.7452 13 62 13H359.022C372.277 13 383.022 23.7452 383.022 37V196.987C383.022 210.242 372.277 220.987 359.022 220.987H62C48.7451 220.987 38 210.242 38 196.987V37Z" fill="url(#paint0_linear_278_1279)" />
                                        <g opacity="0.1">
                                            <path d="M222.65 12.9955C222.65 -57.6945 279.955 -115 350.645 -115C421.335 -115 478.641 -57.6945 478.641 12.9955C478.641 83.6855 421.335 140.991 350.645 140.991C279.955 140.991 222.65 83.6855 222.65 12.9955Z" fill="white" />
                                            <path d="M-58 220.992C-58 167.975 -15.0216 124.997 37.995 124.997C91.0116 124.997 133.99 167.975 133.99 220.992C133.99 274.009 91.0116 316.987 37.995 316.987C-15.0216 316.987 -58 274.009 -58 220.992Z" fill="white" />
                                        </g>
                                        <path d="M61.9888 56.9885C61.9888 45.943 70.9429 36.989 81.9883 36.989C93.0337 36.989 101.988 45.943 101.988 56.9885C101.988 68.0339 93.0337 76.988 81.9883 76.988C70.9429 76.988 61.9888 68.0339 61.9888 56.9885Z" fill="white" />
                                        <path d="M81.9883 46.9931V66.9839" stroke="#155DFC" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M86.9857 49.9917H79.4891C78.5613 49.9917 77.6715 50.3603 77.0154 51.0164C76.3593 51.6724 75.9907 52.5623 75.9907 53.4901C75.9907 54.4179 76.3593 55.3077 77.0154 55.9638C77.6715 56.6199 78.5613 56.9885 79.4891 56.9885H84.4868C85.4146 56.9885 86.3045 57.3571 86.9605 58.0131C87.6166 58.6692 87.9852 59.559 87.9852 60.4869C87.9852 61.4147 87.6166 62.3045 86.9605 62.9606C86.3045 63.6167 85.4146 63.9852 84.4868 63.9852H75.9907" stroke="#155DFC" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M121.159 59.0852C121.159 60.2278 120.711 61.1125 119.814 61.7395C118.924 62.3665 117.667 62.6799 116.044 62.6799C113.026 62.6799 111.277 61.6311 110.797 59.5334L112.423 59.2083C112.61 59.9524 113.009 60.5002 113.618 60.8518C114.228 61.1975 115.057 61.3704 116.105 61.3704C117.189 61.3704 118.024 61.1858 118.61 60.8167C119.202 60.4417 119.498 59.8938 119.498 59.1731C119.498 58.7688 119.404 58.4407 119.217 58.1887C119.035 57.9368 118.777 57.7288 118.443 57.5647C118.109 57.4006 117.711 57.2629 117.248 57.1516C116.785 57.0403 116.272 56.9202 115.71 56.7913C115.06 56.6448 114.515 56.5012 114.075 56.3606C113.642 56.22 113.284 56.0735 113.003 55.9211C112.722 55.7629 112.481 55.5959 112.282 55.4202C111.989 55.1506 111.764 54.8372 111.605 54.4797C111.453 54.1223 111.377 53.7122 111.377 53.2493C111.377 52.1887 111.781 51.3713 112.59 50.7971C113.404 50.2229 114.567 49.9358 116.079 49.9358C117.485 49.9358 118.561 50.1526 119.305 50.5862C120.049 51.0139 120.57 51.7463 120.869 52.7834L119.217 53.0735C119.035 52.4172 118.689 51.9426 118.18 51.6497C117.67 51.3508 116.964 51.2014 116.062 51.2014C115.071 51.2014 114.315 51.3655 113.794 51.6936C113.272 52.0217 113.012 52.511 113.012 53.1614C113.012 53.5422 113.111 53.8586 113.311 54.1106C113.516 54.3567 113.809 54.5647 114.189 54.7346C114.547 54.9045 115.306 55.1184 116.466 55.3762C116.94 55.4875 117.409 55.6047 117.872 55.7278C118.335 55.845 118.771 55.9944 119.182 56.176C119.422 56.2756 119.65 56.3987 119.867 56.5452C120.09 56.6858 120.283 56.8499 120.447 57.0374C120.67 57.2834 120.843 57.5735 120.966 57.9075C121.095 58.2415 121.159 58.634 121.159 59.0852ZM124.411 58.0833C124.411 59.1731 124.637 60.0139 125.088 60.6057C125.539 61.1975 126.198 61.4934 127.065 61.4934C127.751 61.4934 128.299 61.3557 128.709 61.0803C129.125 60.8049 129.406 60.4563 129.553 60.0344L130.941 60.4299C130.373 61.9299 129.081 62.6799 127.065 62.6799C125.659 62.6799 124.587 62.261 123.849 61.4231C123.116 60.5852 122.75 59.3401 122.75 57.6877C122.75 56.1174 123.116 54.9133 123.849 54.0754C124.587 53.2375 125.639 52.8186 127.004 52.8186C128.404 52.8186 129.453 53.2405 130.15 54.0842C130.848 54.928 131.196 56.1907 131.196 57.8723V58.0833H124.411ZM129.562 56.8704C129.474 55.8684 129.219 55.1389 128.797 54.6819C128.375 54.219 127.769 53.9875 126.978 53.9875C126.21 53.9875 125.601 54.2454 125.149 54.761C124.704 55.2708 124.464 55.9739 124.429 56.8704H129.562ZM136.865 62.6799C135.535 62.6799 134.519 62.261 133.815 61.4231C133.118 60.5793 132.77 59.3518 132.77 57.7405C132.77 56.1409 133.121 54.9221 133.824 54.0842C134.527 53.2405 135.535 52.8186 136.848 52.8186C137.82 52.8186 138.626 53.0706 139.265 53.5745C139.909 54.0784 140.313 54.7727 140.478 55.6575L138.852 55.7805C138.77 55.2532 138.562 54.8342 138.228 54.5237C137.894 54.2131 137.419 54.0579 136.804 54.0579C135.966 54.0579 135.359 54.3362 134.984 54.8928C134.609 55.4495 134.422 56.387 134.422 57.7053C134.422 58.9709 134.621 59.9084 135.02 60.5178C135.418 61.1272 136.019 61.4319 136.821 61.4319C137.384 61.4319 137.853 61.2795 138.228 60.9749C138.608 60.6702 138.843 60.2014 138.931 59.5686L140.53 59.6741C140.448 60.2834 140.243 60.8137 139.915 61.2649C139.593 61.7161 139.171 62.0647 138.649 62.3108C138.134 62.5569 137.539 62.6799 136.865 62.6799ZM148.229 60.8782C147.866 61.5344 147.444 62.0002 146.964 62.2756C146.489 62.5452 145.897 62.6799 145.188 62.6799C144.146 62.6799 143.381 62.4221 142.895 61.9065C142.414 61.385 142.174 60.5266 142.174 59.3313V52.9944H143.765V59.0237C143.765 59.9729 143.911 60.6174 144.204 60.9573C144.503 61.2913 145.01 61.4583 145.725 61.4583C146.486 61.4583 147.087 61.1975 147.526 60.676C147.966 60.1545 148.186 59.4309 148.186 58.5051V52.9944H149.768V60.4739C149.768 61.0247 149.771 61.47 149.776 61.8098C149.788 62.1497 149.803 62.3811 149.82 62.5042H148.326C148.32 62.4749 148.309 62.3372 148.291 62.0911C148.279 61.845 148.268 61.4407 148.256 60.8782H148.229ZM153.854 57.5471V62.5042H152.272V55.2092C152.272 54.8752 152.267 54.5237 152.255 54.1545C152.249 53.7854 152.237 53.3987 152.22 52.9944H153.714C153.726 53.2639 153.734 53.5071 153.74 53.7239C153.752 53.9407 153.761 54.1311 153.767 54.2952C153.772 54.4534 153.775 54.5881 153.775 54.6995C153.781 54.8049 153.784 54.884 153.784 54.9368H153.819C153.995 54.3625 154.188 53.9172 154.399 53.6008C154.604 53.3079 154.839 53.1057 155.103 52.9944C155.366 52.8772 155.691 52.8186 156.078 52.8186C156.295 52.8186 156.509 52.8479 156.72 52.9065V54.3567C156.521 54.2981 156.239 54.2688 155.876 54.2688C155.22 54.2688 154.719 54.553 154.373 55.1213C154.027 55.6838 153.854 56.4924 153.854 57.5471ZM159.444 58.0833C159.444 59.1731 159.67 60.0139 160.121 60.6057C160.572 61.1975 161.231 61.4934 162.099 61.4934C162.784 61.4934 163.332 61.3557 163.742 61.0803C164.158 60.8049 164.439 60.4563 164.586 60.0344L165.975 60.4299C165.406 61.9299 164.114 62.6799 162.099 62.6799C160.692 62.6799 159.62 62.261 158.882 61.4231C158.149 60.5852 157.783 59.3401 157.783 57.6877C157.783 56.1174 158.149 54.9133 158.882 54.0754C159.62 53.2375 160.672 52.8186 162.037 52.8186C163.438 52.8186 164.486 53.2405 165.184 54.0842C165.881 54.928 166.229 56.1907 166.229 57.8723V58.0833H159.444ZM164.595 56.8704C164.507 55.8684 164.252 55.1389 163.83 54.6819C163.408 54.219 162.802 53.9875 162.011 53.9875C161.243 53.9875 160.634 54.2454 160.183 54.761C159.737 55.2708 159.497 55.9739 159.462 56.8704H164.595ZM178.095 59.0149C178.095 60.1165 177.693 60.9749 176.891 61.5901C176.088 62.1995 174.972 62.5042 173.542 62.5042H168.515V50.1204H173.015C174.468 50.1204 175.558 50.3723 176.284 50.8762C177.011 51.3743 177.374 52.1243 177.374 53.1262C177.374 53.8586 177.169 54.4739 176.759 54.9719C176.349 55.47 175.769 55.804 175.019 55.9739C176.003 56.0911 176.762 56.4221 177.295 56.967C177.828 57.5061 178.095 58.1887 178.095 59.0149ZM175.687 53.3284C175.687 52.6604 175.458 52.1829 175.001 51.8958C174.544 51.6086 173.882 51.4651 173.015 51.4651H170.193V55.385H173.015C173.911 55.385 174.579 55.218 175.019 54.884C175.464 54.5442 175.687 54.0256 175.687 53.3284ZM176.398 58.8831C176.398 57.4241 175.373 56.6946 173.322 56.6946H170.193V61.1594H173.454C174.479 61.1594 175.227 60.969 175.695 60.5881C176.164 60.2073 176.398 59.6389 176.398 58.8831ZM182.683 62.6799C181.728 62.6799 181.01 62.428 180.529 61.9241C180.049 61.4202 179.809 60.7288 179.809 59.8499C179.809 58.8655 180.131 58.1096 180.775 57.5823C181.426 57.0549 182.472 56.7737 183.913 56.7385L186.049 56.7034V56.1848C186.049 55.4114 185.885 54.8577 185.557 54.5237C185.229 54.1897 184.713 54.0227 184.01 54.0227C183.301 54.0227 182.785 54.1428 182.463 54.3831C182.141 54.6233 181.947 55.0071 181.883 55.5344L180.23 55.385C180.5 53.6741 181.771 52.8186 184.045 52.8186C185.24 52.8186 186.14 53.094 186.743 53.6448C187.347 54.1897 187.648 54.9807 187.648 56.0178V60.1135C187.648 60.5823 187.71 60.9368 187.833 61.177C187.956 61.4114 188.19 61.5286 188.536 61.5286C188.7 61.5286 188.873 61.5081 189.055 61.467V62.4514C188.855 62.4983 188.653 62.5334 188.448 62.5569C188.243 62.5803 188.038 62.592 187.833 62.592C187.247 62.592 186.819 62.4397 186.55 62.135C186.286 61.8245 186.137 61.3411 186.102 60.6848H186.049C185.645 61.4114 185.173 61.927 184.634 62.2317C184.101 62.5305 183.45 62.6799 182.683 62.6799ZM186.049 57.8108L184.317 57.8459C183.579 57.8518 183.017 57.928 182.63 58.0745C182.243 58.2151 181.947 58.4319 181.742 58.7249C181.537 59.0178 181.435 59.4016 181.435 59.8762C181.435 60.3918 181.572 60.7903 181.848 61.0715C182.129 61.3528 182.527 61.4934 183.043 61.4934C183.629 61.4934 184.145 61.3616 184.59 61.0979C185.041 60.8342 185.396 60.4739 185.653 60.0168C185.917 59.554 186.049 59.0793 186.049 58.593V57.8108ZM191.894 56.9934V62.5042H190.312V55.0247C190.312 54.468 190.306 54.0227 190.294 53.6887C190.288 53.3489 190.276 53.1174 190.259 52.9944H191.753C191.765 53.1057 191.773 53.2463 191.779 53.4163C191.791 53.5862 191.8 53.7737 191.806 53.9788C191.812 54.1838 191.817 54.3977 191.823 54.6204H191.85C192.213 53.9641 192.632 53.5012 193.106 53.2317C193.587 52.9563 194.182 52.8186 194.891 52.8186C195.934 52.8186 196.695 53.0852 197.176 53.6184C197.662 54.1516 197.905 55.0012 197.905 56.1672V62.5042H196.314V56.4749C196.314 55.5667 196.168 54.9338 195.875 54.5764C195.582 54.219 195.075 54.0403 194.354 54.0403C193.593 54.0403 192.992 54.301 192.553 54.8225C192.113 55.344 191.894 56.0676 191.894 56.9934ZM201.878 59.1204V62.5042H200.296V49.4612H201.878V57.6086L206.053 52.9944H207.907L204.049 57.0813L208.109 62.5042H206.255L203.038 58.1624L201.878 59.1204Z" fill="white" />
                                        <path d="M321.32 47.6569H299.99C298.518 47.6569 297.324 48.8505 297.324 50.323V63.6538C297.324 65.1263 298.518 66.32 299.99 66.32H321.32C322.792 66.32 323.986 65.1263 323.986 63.6538V50.323C323.986 48.8505 322.792 47.6569 321.32 47.6569Z" stroke="white" stroke-opacity="0.8" stroke-width="2.66616" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M297.324 54.3223H323.986" stroke="white" stroke-opacity="0.8" stroke-width="2.66616" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M69.8169 112.922L68.4224 113.766L66.6646 110.743L64.8364 113.743L63.4419 112.899L65.6567 109.993L62.3755 109.137L62.9028 107.567L66.0317 108.821L65.8911 105.34H67.4849L67.3325 108.797L70.4263 107.59L70.9536 109.137L67.6489 109.993L69.8169 112.922ZM81.5685 112.922L80.1739 113.766L78.4161 110.743L76.588 113.743L75.1935 112.899L77.4083 109.993L74.1271 109.137L74.6544 107.567L77.7833 108.821L77.6427 105.34H79.2364L79.0841 108.797L82.1778 107.59L82.7052 109.137L79.4005 109.993L81.5685 112.922ZM93.32 112.922L91.9255 113.766L90.1677 110.743L88.3396 113.743L86.945 112.899L89.1599 109.993L85.8786 109.137L86.406 107.567L89.5349 108.821L89.3942 105.34H90.988L90.8356 108.797L93.9294 107.59L94.4567 109.137L91.1521 109.993L93.32 112.922ZM105.072 112.922L103.677 113.766L101.919 110.743L100.091 113.743L98.6966 112.899L100.911 109.993L97.6302 109.137L98.1575 107.567L101.286 108.821L101.146 105.34H102.74L102.587 108.797L105.681 107.59L106.208 109.137L102.904 109.993L105.072 112.922ZM125.903 112.922L124.508 113.766L122.75 110.743L120.922 113.743L119.528 112.899L121.743 109.993L118.461 109.137L118.989 107.567L122.118 108.821L121.977 105.34H123.571L123.418 108.797L126.512 107.59L127.04 109.137L123.735 109.993L125.903 112.922ZM137.654 112.922L136.26 113.766L134.502 110.743L132.674 113.743L131.279 112.899L133.494 109.993L130.213 109.137L130.74 107.567L133.869 108.821L133.729 105.34H135.322L135.17 108.797L138.264 107.59L138.791 109.137L135.486 109.993L137.654 112.922ZM149.406 112.922L148.011 113.766L146.254 110.743L144.425 113.743L143.031 112.899L145.246 109.993L141.965 109.137L142.492 107.567L145.621 108.821L145.48 105.34H147.074L146.922 108.797L150.015 107.59L150.543 109.137L147.238 109.993L149.406 112.922ZM161.158 112.922L159.763 113.766L158.005 110.743L156.177 113.743L154.783 112.899L156.997 109.993L153.716 109.137L154.243 107.567L157.372 108.821L157.232 105.34H158.825L158.673 108.797L161.767 107.59L162.294 109.137L158.99 109.993L161.158 112.922ZM181.989 112.922L180.594 113.766L178.836 110.743L177.008 113.743L175.614 112.899L177.829 109.993L174.547 109.137L175.075 107.567L178.204 108.821L178.063 105.34H179.657L179.504 108.797L182.598 107.59L183.125 109.137L179.821 109.993L181.989 112.922ZM193.74 112.922L192.346 113.766L190.588 110.743L188.76 113.743L187.365 112.899L189.58 109.993L186.299 109.137L186.826 107.567L189.955 108.821L189.815 105.34H191.408L191.256 108.797L194.35 107.59L194.877 109.137L191.572 109.993L193.74 112.922ZM205.492 112.922L204.097 113.766L202.34 110.743L200.511 113.743L199.117 112.899L201.332 109.993L198.05 109.137L198.578 107.567L201.707 108.821L201.566 105.34H203.16L203.008 108.797L206.101 107.59L206.629 109.137L203.324 109.993L205.492 112.922ZM217.243 112.922L215.849 113.766L214.091 110.743L212.263 113.743L210.868 112.899L213.083 109.993L209.802 109.137L210.329 107.567L213.458 108.821L213.318 105.34H214.911L214.759 108.797L217.853 107.59L218.38 109.137L215.075 109.993L217.243 112.922ZM240.571 118.114V121.852H238.579V118.114H230.797V116.473L238.356 105.34H240.571V116.45H242.891V118.114H240.571ZM232.743 116.45H238.579V109.864C238.579 109.504 238.579 109.149 238.579 108.797C238.586 108.438 238.602 108.079 238.625 107.719C238.446 108.063 238.29 108.344 238.157 108.563C238.024 108.774 237.903 108.958 237.793 109.114L232.743 116.45ZM258.147 107.051C257.303 108.34 256.58 109.489 255.979 110.497C255.385 111.504 254.916 112.375 254.572 113.11C253.877 114.571 253.354 116.012 253.002 117.434C252.658 118.856 252.486 120.329 252.486 121.852H250.283C250.283 120.758 250.397 119.649 250.623 118.524C250.85 117.391 251.213 116.204 251.713 114.961C252.182 113.797 252.775 112.571 253.494 111.282C254.221 109.985 255.092 108.602 256.108 107.133H247.236V105.34H258.147V107.051ZM273.906 120.059V121.852H262.972V120.364C263.371 119.45 263.851 118.641 264.414 117.938C264.984 117.235 265.59 116.602 266.23 116.04C266.871 115.477 267.504 114.954 268.129 114.469C268.441 114.227 268.734 113.985 269.008 113.743C269.289 113.5 269.554 113.258 269.804 113.016C270.304 112.532 270.707 112.024 271.011 111.493C271.324 110.961 271.48 110.36 271.48 109.688C271.48 108.782 271.215 108.079 270.683 107.579C270.152 107.079 269.414 106.829 268.468 106.829C267.57 106.829 266.828 107.075 266.242 107.567C265.664 108.051 265.324 108.735 265.222 109.618L263.066 109.418C263.222 108.098 263.781 107.047 264.742 106.266C265.711 105.485 266.953 105.094 268.468 105.094C270.133 105.094 271.41 105.489 272.3 106.278C273.199 107.059 273.648 108.172 273.648 109.618C273.648 110.258 273.5 110.895 273.203 111.528C272.914 112.161 272.48 112.793 271.902 113.426C271.613 113.739 271.191 114.141 270.636 114.633C270.082 115.125 269.398 115.704 268.586 116.368C267.687 117.102 266.972 117.766 266.441 118.36C265.91 118.946 265.527 119.512 265.293 120.059H273.906ZM289.736 113.262C289.736 116.098 289.216 118.278 288.177 119.801C287.146 121.325 285.673 122.086 283.759 122.086C282.47 122.086 281.435 121.817 280.654 121.278C279.88 120.731 279.325 119.852 278.99 118.641L281.005 118.325C281.427 119.7 282.357 120.387 283.794 120.387C285.005 120.387 285.943 119.825 286.607 118.7C287.271 117.575 287.618 115.969 287.65 113.883C287.337 114.586 286.802 115.153 286.044 115.583C285.286 116.004 284.454 116.215 283.548 116.215C282.564 116.215 281.704 115.985 280.97 115.524C280.236 115.063 279.665 114.415 279.259 113.579C278.853 112.743 278.65 111.766 278.65 110.649C278.65 108.922 279.134 107.567 280.103 106.583C281.072 105.59 282.419 105.094 284.146 105.094C285.982 105.094 287.372 105.774 288.318 107.133C289.263 108.493 289.736 110.536 289.736 113.262ZM287.439 111.223C287.439 109.895 287.134 108.829 286.525 108.024C285.915 107.211 285.099 106.805 284.075 106.805C283.06 106.805 282.259 107.153 281.673 107.848C281.087 108.536 280.794 109.469 280.794 110.649C280.794 111.852 281.087 112.805 281.673 113.508C282.259 114.204 283.052 114.551 284.052 114.551C284.661 114.551 285.22 114.411 285.728 114.129C286.243 113.848 286.658 113.458 286.97 112.958C287.283 112.45 287.439 111.872 287.439 111.223Z" fill="white" />
                                        <path d="M66.6763 164.233C67.8325 164.233 68.7017 163.661 69.2837 162.516L70.1978 162.973C69.8579 163.684 69.3794 164.225 68.7622 164.596C68.1489 164.967 67.436 165.153 66.6235 165.153C65.7876 165.153 65.0688 164.979 64.4673 164.631C63.8657 164.284 63.4028 163.79 63.0786 163.149C62.7583 162.505 62.5981 161.745 62.5981 160.87C62.5981 159.991 62.7583 159.237 63.0786 158.608C63.3989 157.979 63.8599 157.497 64.4614 157.161C65.063 156.825 65.7817 156.657 66.6177 156.657C67.4966 156.657 68.231 156.829 68.8208 157.172C69.4106 157.516 69.8442 158.026 70.1216 158.702L69.061 159.053C68.8696 158.573 68.561 158.206 68.1353 157.952C67.7134 157.698 67.2114 157.571 66.6294 157.571C65.7153 157.571 65.0044 157.866 64.4966 158.456C63.9888 159.042 63.7349 159.846 63.7349 160.87C63.7349 161.542 63.854 162.131 64.0923 162.639C64.3345 163.143 64.6743 163.536 65.1118 163.817C65.5532 164.094 66.0747 164.233 66.6763 164.233ZM72.7935 162.622L71.8442 165.036H70.6841L74.0532 156.78H75.3247L78.6411 165.036H77.4985L76.5552 162.622H72.7935ZM74.6743 157.624C74.6079 157.842 74.5278 158.087 74.4341 158.356C74.3442 158.622 74.2603 158.856 74.1821 159.059L73.1333 161.749H76.2212L75.1606 159.024C75.106 158.887 75.0337 158.694 74.9438 158.444C74.854 158.194 74.7642 157.921 74.6743 157.624ZM80.7681 161.608V165.036H79.6489V156.78H83.5337C84.4634 156.78 85.1802 156.989 85.6841 157.407C86.1919 157.821 86.4458 158.399 86.4458 159.141C86.4458 159.755 86.2661 160.27 85.9067 160.688C85.5513 161.106 85.0591 161.37 84.4302 161.479L86.7739 165.036H85.4849L83.3403 161.608H80.7681ZM85.3208 159.153C85.3208 158.672 85.1567 158.307 84.8286 158.057C84.5044 157.803 84.0356 157.676 83.4224 157.676H80.7681V160.723H83.4692C84.0591 160.723 84.5142 160.587 84.8345 160.313C85.1587 160.036 85.3208 159.649 85.3208 159.153ZM95.4282 160.823C95.4282 161.694 95.2583 162.444 94.9185 163.073C94.5825 163.702 94.1118 164.186 93.5063 164.526C92.9048 164.866 92.2056 165.036 91.4087 165.036H88.3208V156.78H91.0513C92.4497 156.78 93.5278 157.131 94.2856 157.835C95.0474 158.534 95.4282 159.53 95.4282 160.823ZM94.3032 160.823C94.3032 159.799 94.022 159.02 93.4595 158.485C92.9009 157.946 92.0903 157.676 91.0278 157.676H89.4399V164.139H91.2798C91.8931 164.139 92.4243 164.005 92.8735 163.735C93.3267 163.465 93.6782 163.083 93.9282 162.587C94.1782 162.09 94.3032 161.503 94.3032 160.823ZM101.452 161.21V165.036H100.333V156.78H101.452V160.272H105.917V156.78H107.036V165.036H105.917V161.21H101.452ZM116.78 160.87C116.78 161.753 116.612 162.514 116.276 163.155C115.944 163.796 115.471 164.29 114.858 164.637C114.245 164.981 113.518 165.153 112.678 165.153C111.834 165.153 111.106 164.981 110.493 164.637C109.883 164.294 109.413 163.801 109.081 163.161C108.752 162.52 108.588 161.756 108.588 160.87C108.588 159.987 108.75 159.233 109.075 158.608C109.403 157.979 109.872 157.497 110.481 157.161C111.094 156.825 111.831 156.657 112.69 156.657C113.534 156.657 114.26 156.823 114.87 157.155C115.483 157.487 115.954 157.967 116.282 158.596C116.614 159.221 116.78 159.979 116.78 160.87ZM115.637 160.87C115.637 159.842 115.379 159.036 114.864 158.45C114.352 157.864 113.627 157.571 112.69 157.571C111.745 157.571 111.014 157.86 110.499 158.438C109.983 159.016 109.725 159.827 109.725 160.87C109.725 161.557 109.842 162.155 110.077 162.663C110.311 163.167 110.649 163.557 111.09 163.835C111.532 164.108 112.061 164.245 112.678 164.245C113.631 164.245 114.362 163.952 114.87 163.366C115.381 162.776 115.637 161.944 115.637 160.87ZM123.635 164.122V165.036H118.344V156.78H119.463V164.122H123.635ZM132.131 160.823C132.131 161.694 131.961 162.444 131.622 163.073C131.286 163.702 130.815 164.186 130.209 164.526C129.608 164.866 128.909 165.036 128.112 165.036H125.024V156.78H127.754C129.153 156.78 130.231 157.131 130.989 157.835C131.75 158.534 132.131 159.53 132.131 160.823ZM131.006 160.823C131.006 159.799 130.725 159.02 130.163 158.485C129.604 157.946 128.793 157.676 127.731 157.676H126.143V164.139H127.983C128.596 164.139 129.127 164.005 129.577 163.735C130.03 163.465 130.381 163.083 130.631 162.587C130.881 162.09 131.006 161.503 131.006 160.823ZM140.2 164.122V165.036H133.696V156.78H139.959V157.694H134.815V160.342H139.608V161.245H134.815V164.122H140.2ZM142.819 161.608V165.036H141.7V156.78H145.584C146.514 156.78 147.231 156.989 147.735 157.407C148.243 157.821 148.497 158.399 148.497 159.141C148.497 159.755 148.317 160.27 147.958 160.688C147.602 161.106 147.11 161.37 146.481 161.479L148.825 165.036H147.536L145.391 161.608H142.819ZM147.372 159.153C147.372 158.672 147.208 158.307 146.879 158.057C146.555 157.803 146.086 157.676 145.473 157.676H142.819V160.723H145.52C146.11 160.723 146.565 160.587 146.885 160.313C147.209 160.036 147.372 159.649 147.372 159.153Z" fill="#BEDBFF" />
                                        <path d="M65.5591 189.84C64.6268 189.84 63.8846 189.6 63.3325 189.121C62.7804 188.636 62.4159 187.913 62.2388 186.949L63.6997 186.707C63.7935 187.311 64.0044 187.782 64.3325 188.121C64.6606 188.459 65.0721 188.629 65.5669 188.629C66.1086 188.629 66.5356 188.444 66.8481 188.074C67.1606 187.699 67.3169 187.152 67.3169 186.433V179.894H65.1997V178.676H68.8013V186.402C68.8013 187.47 68.5122 188.311 67.9341 188.926C67.356 189.535 66.5643 189.84 65.5591 189.84ZM81.6685 184.129C81.6685 185.306 81.4445 186.321 80.9966 187.176C80.5539 188.03 79.9237 188.689 79.106 189.152C78.2882 189.61 77.3195 189.84 76.1997 189.84C75.0747 189.84 74.1034 189.61 73.2856 189.152C72.4731 188.694 71.8455 188.038 71.4028 187.183C70.9653 186.329 70.7466 185.311 70.7466 184.129C70.7466 182.952 70.9627 181.946 71.395 181.113C71.8325 180.274 72.4575 179.631 73.27 179.183C74.0877 178.735 75.0695 178.511 76.2153 178.511C77.3403 178.511 78.3091 178.733 79.1216 179.176C79.9393 179.618 80.5669 180.259 81.0044 181.097C81.4471 181.931 81.6685 182.941 81.6685 184.129ZM80.145 184.129C80.145 182.759 79.8013 181.683 79.1138 180.902C78.4315 180.121 77.4653 179.73 76.2153 179.73C74.9549 179.73 73.981 180.116 73.2935 180.886C72.606 181.657 72.2622 182.738 72.2622 184.129C72.2622 185.045 72.4185 185.842 72.731 186.519C73.0435 187.191 73.494 187.712 74.0825 188.082C74.6711 188.446 75.3768 188.629 76.1997 188.629C77.4705 188.629 78.4445 188.238 79.1216 187.457C79.8039 186.67 80.145 185.561 80.145 184.129ZM85.2466 184.582V189.683H83.7544V178.676H85.2466V183.332H91.1997V178.676H92.6919V189.683H91.1997V184.582H85.2466ZM96.645 182.371V189.683H95.3169V178.676H97.0513L103.004 188.113C102.942 187.087 102.911 186.347 102.911 185.894V178.676H104.254V189.683H102.458L96.5669 180.308C96.5773 180.652 96.5929 180.996 96.6138 181.34C96.6346 181.683 96.645 182.027 96.645 182.371ZM120.809 184.066C120.809 185.228 120.583 186.228 120.129 187.066C119.681 187.905 119.054 188.551 118.247 189.004C117.444 189.457 116.512 189.683 115.45 189.683H111.333V178.676H114.973C116.838 178.676 118.275 179.144 119.286 180.082C120.301 181.014 120.809 182.342 120.809 184.066ZM119.309 184.066C119.309 182.702 118.934 181.663 118.184 180.949C117.439 180.23 116.359 179.871 114.942 179.871H112.825V188.488H115.278C116.096 188.488 116.804 188.308 117.403 187.949C118.007 187.59 118.476 187.079 118.809 186.418C119.142 185.756 119.309 184.972 119.309 184.066ZM133.262 184.129C133.262 185.306 133.038 186.321 132.59 187.176C132.148 188.03 131.517 188.689 130.7 189.152C129.882 189.61 128.913 189.84 127.793 189.84C126.668 189.84 125.697 189.61 124.879 189.152C124.067 188.694 123.439 188.038 122.997 187.183C122.559 186.329 122.34 185.311 122.34 184.129C122.34 182.952 122.556 181.946 122.989 181.113C123.426 180.274 124.051 179.631 124.864 179.183C125.681 178.735 126.663 178.511 127.809 178.511C128.934 178.511 129.903 178.733 130.715 179.176C131.533 179.618 132.161 180.259 132.598 181.097C133.041 181.931 133.262 182.941 133.262 184.129ZM131.739 184.129C131.739 182.759 131.395 181.683 130.708 180.902C130.025 180.121 129.059 179.73 127.809 179.73C126.549 179.73 125.575 180.116 124.887 180.886C124.2 181.657 123.856 182.738 123.856 184.129C123.856 185.045 124.012 185.842 124.325 186.519C124.637 187.191 125.088 187.712 125.676 188.082C126.265 188.446 126.971 188.629 127.793 188.629C129.064 188.629 130.038 188.238 130.715 187.457C131.398 186.67 131.739 185.561 131.739 184.129ZM144.02 188.465V189.683H135.348V178.676H143.7V179.894H136.84V183.426H143.231V184.629H136.84V188.465H144.02Z" fill="white" />
                                        <path d="M288.504 164.122V165.036H282V156.78H288.264V157.694H283.12V160.342H287.913V161.245H283.12V164.122H288.504ZM293.057 161.426L290.526 165.036H289.29L292.43 160.747L289.53 156.78H290.766L293.063 160.02L295.295 156.78H296.532L293.708 160.706L296.772 165.036H295.536L293.057 161.426ZM304.395 159.264C304.395 159.784 304.28 160.235 304.049 160.618C303.819 161.001 303.491 161.297 303.065 161.508C302.643 161.715 302.139 161.819 301.553 161.819H299.127V165.036H298.008V156.78H301.483C302.409 156.78 303.125 156.997 303.633 157.43C304.141 157.864 304.395 158.475 304.395 159.264ZM303.27 159.276C303.27 158.21 302.629 157.676 301.348 157.676H299.127V160.934H301.395C302.02 160.934 302.489 160.797 302.801 160.524C303.114 160.247 303.27 159.831 303.27 159.276ZM307.254 156.78V165.036H306.135V156.78H307.254ZM310.471 161.608V165.036H309.352V156.78H313.237C314.167 156.78 314.883 156.989 315.387 157.407C315.895 157.821 316.149 158.399 316.149 159.141C316.149 159.755 315.969 160.27 315.61 160.688C315.254 161.106 314.762 161.37 314.133 161.479L316.477 165.036H315.188L313.043 161.608H310.471ZM315.024 159.153C315.024 158.672 314.86 158.307 314.532 158.057C314.208 157.803 313.739 157.676 313.125 157.676H310.471V160.723H313.172C313.762 160.723 314.217 160.587 314.538 160.313C314.862 160.036 315.024 159.649 315.024 159.153ZM324.528 164.122V165.036H318.024V156.78H324.288V157.694H319.143V160.342H323.936V161.245H319.143V164.122H324.528ZM332.497 162.756C332.497 163.518 332.198 164.108 331.6 164.526C331.006 164.944 330.168 165.153 329.086 165.153C327.075 165.153 325.909 164.454 325.588 163.055L326.672 162.839C326.797 163.335 327.063 163.7 327.469 163.934C327.875 164.165 328.428 164.28 329.127 164.28C329.85 164.28 330.407 164.157 330.797 163.911C331.192 163.661 331.389 163.296 331.389 162.815C331.389 162.546 331.327 162.327 331.202 162.159C331.081 161.991 330.909 161.852 330.686 161.743C330.463 161.633 330.198 161.542 329.889 161.467C329.581 161.393 329.239 161.313 328.864 161.227C328.43 161.13 328.067 161.034 327.774 160.94C327.485 160.846 327.247 160.749 327.059 160.647C326.872 160.542 326.711 160.43 326.579 160.313C326.383 160.133 326.233 159.924 326.127 159.686C326.026 159.448 325.975 159.174 325.975 158.866C325.975 158.159 326.245 157.614 326.784 157.231C327.327 156.848 328.102 156.657 329.11 156.657C330.047 156.657 330.764 156.801 331.26 157.09C331.756 157.376 332.104 157.864 332.303 158.555L331.202 158.749C331.081 158.311 330.85 157.995 330.51 157.799C330.17 157.6 329.7 157.501 329.098 157.501C328.438 157.501 327.934 157.61 327.586 157.829C327.239 158.047 327.065 158.374 327.065 158.807C327.065 159.061 327.131 159.272 327.264 159.44C327.401 159.604 327.596 159.743 327.85 159.856C328.088 159.969 328.594 160.112 329.368 160.284C329.684 160.358 329.997 160.436 330.305 160.518C330.614 160.596 330.905 160.696 331.178 160.817C331.338 160.883 331.491 160.965 331.635 161.063C331.784 161.157 331.913 161.266 332.022 161.391C332.17 161.555 332.286 161.749 332.368 161.971C332.454 162.194 332.497 162.456 332.497 162.756Z" fill="#BEDBFF" />
                                        <path d="M295.323 188.488V189.683H288.425V188.488H291.229V180.019L288.745 181.793V180.465L291.347 178.676H292.644V188.488H295.323ZM304.206 188.488V189.683H296.917V188.691C297.183 188.082 297.503 187.543 297.878 187.074C298.258 186.605 298.662 186.183 299.089 185.808C299.516 185.433 299.938 185.084 300.354 184.761C300.563 184.6 300.758 184.439 300.94 184.277C301.128 184.116 301.305 183.954 301.472 183.793C301.805 183.47 302.073 183.131 302.276 182.777C302.485 182.423 302.589 182.022 302.589 181.574C302.589 180.97 302.412 180.501 302.058 180.168C301.703 179.834 301.211 179.668 300.581 179.668C299.982 179.668 299.487 179.832 299.097 180.16C298.711 180.483 298.485 180.939 298.417 181.527L296.979 181.394C297.084 180.514 297.456 179.814 298.097 179.293C298.743 178.772 299.571 178.511 300.581 178.511C301.69 178.511 302.542 178.774 303.136 179.301C303.735 179.821 304.034 180.564 304.034 181.527C304.034 181.954 303.935 182.379 303.737 182.801C303.545 183.222 303.256 183.644 302.87 184.066C302.677 184.274 302.396 184.543 302.026 184.871C301.657 185.199 301.201 185.584 300.659 186.027C300.06 186.517 299.584 186.959 299.229 187.355C298.875 187.746 298.62 188.123 298.464 188.488H304.206ZM309.464 178.09L306.284 189.84H305.019L308.229 178.09H309.464ZM317.565 188.488V189.683H310.276V188.691C310.542 188.082 310.862 187.543 311.237 187.074C311.618 186.605 312.021 186.183 312.448 185.808C312.875 185.433 313.297 185.084 313.714 184.761C313.922 184.6 314.118 184.439 314.3 184.277C314.487 184.116 314.664 183.954 314.831 183.793C315.164 183.47 315.433 183.131 315.636 182.777C315.844 182.423 315.948 182.022 315.948 181.574C315.948 180.97 315.771 180.501 315.417 180.168C315.063 179.834 314.571 179.668 313.94 179.668C313.341 179.668 312.847 179.832 312.456 180.16C312.071 180.483 311.844 180.939 311.776 181.527L310.339 181.394C310.443 180.514 310.815 179.814 311.456 179.293C312.102 178.772 312.93 178.511 313.94 178.511C315.05 178.511 315.901 178.774 316.495 179.301C317.094 179.821 317.394 180.564 317.394 181.527C317.394 181.954 317.295 182.379 317.097 182.801C316.904 183.222 316.615 183.644 316.229 184.066C316.037 184.274 315.756 184.543 315.386 184.871C315.016 185.199 314.56 185.584 314.019 186.027C313.42 186.517 312.943 186.959 312.589 187.355C312.235 187.746 311.979 188.123 311.823 188.488H317.565ZM326.472 179.816C325.909 180.676 325.427 181.441 325.026 182.113C324.631 182.785 324.318 183.366 324.089 183.855C323.625 184.829 323.276 185.79 323.042 186.738C322.813 187.686 322.698 188.668 322.698 189.683H321.229C321.229 188.954 321.305 188.215 321.456 187.465C321.607 186.709 321.849 185.918 322.183 185.09C322.495 184.314 322.891 183.496 323.37 182.636C323.854 181.772 324.435 180.85 325.112 179.871H319.198V178.676H326.472V179.816Z" fill="white" />
                                    </g>
                                </g>
                                <defs>
                                    <filter id="filter0_d_278_1279" x="0" y="0" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feMorphology radius="12" operator="erode" in="SourceAlpha" result="effect1_dropShadow_278_1279" />
                                        <feOffset dy="25" />
                                        <feGaussianBlur stdDeviation="25" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_278_1279" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_278_1279" result="shape" />
                                    </filter>
                                    <linearGradient id="paint0_linear_278_1279" x1="38" y1="13" x2="221.922" y2="318.102" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#7E7DE0" />
                                        <stop offset="1" stop-color="#66A6EA" />
                                    </linearGradient>
                                    <clipPath id="clip0_278_1279">
                                        <path d="M38 37C38 23.7452 48.7452 13 62 13H359.022C372.277 13 383.022 23.7452 383.022 37V196.987C383.022 210.242 372.277 220.987 359.022 220.987H62C48.7451 220.987 38 210.242 38 196.987V37Z" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>



                            <div className={styles.bankInfoBox}>
                                <svg width="370" height="341" viewBox="0 0 370 341" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_dd_278_1308)">
                                        <path d="M12 26C12 12.7452 22.7452 2 36 2H333.022C346.277 2 357.022 12.7452 357.022 26V294.722C357.022 307.977 346.277 318.722 333.022 318.722H36C22.7451 318.722 12 307.977 12 294.722V26Z" fill="white" shape-rendering="crispEdges" />
                                        <mask id="path-2-inside-1_278_1308" fill="white">
                                            <path d="M35.9888 25.989H333.033V126.797H35.9888V25.989Z" />
                                        </mask>
                                        <path d="M333.033 126.797V125.96H35.9888V126.797V127.635H333.033V126.797Z" fill="#E5E7EB" mask="url(#path-2-inside-1_278_1308)" />
                                        <path d="M115.314 37.0097L114.207 39.8261H112.854L116.784 30.1943H118.268L122.137 39.8261H120.804L119.703 37.0097H115.314ZM117.509 31.1786C117.431 31.4339 117.338 31.7187 117.229 32.0331C117.124 32.343 117.026 32.6165 116.935 32.8535L115.711 35.9911H119.313L118.076 32.8124C118.012 32.6529 117.928 32.4273 117.823 32.1357C117.718 31.844 117.614 31.525 117.509 31.1786ZM128.856 32.4296L126.095 39.8261H124.639L121.952 32.4296H123.265L124.892 37.2421C124.924 37.3333 124.978 37.5156 125.056 37.789C125.133 38.0579 125.236 38.4156 125.363 38.8622C125.423 38.6845 125.479 38.4999 125.534 38.3085C125.593 38.1126 125.65 37.9234 125.705 37.7411C125.764 37.5589 125.819 37.3971 125.869 37.2558L127.551 32.4296H128.856ZM131.734 39.9628C130.992 39.9628 130.433 39.7669 130.06 39.3749C129.686 38.983 129.499 38.4453 129.499 37.7617C129.499 36.996 129.75 36.4081 130.251 35.998C130.757 35.5878 131.57 35.3691 132.691 35.3417L134.353 35.3144V34.9111C134.353 34.3095 134.225 33.8788 133.97 33.6191C133.715 33.3593 133.313 33.2294 132.767 33.2294C132.215 33.2294 131.814 33.3229 131.563 33.5097C131.313 33.6966 131.162 33.9951 131.112 34.4052L129.827 34.289C130.037 32.9583 131.026 32.2929 132.794 32.2929C133.724 32.2929 134.423 32.5071 134.893 32.9355C135.362 33.3593 135.597 33.9745 135.597 34.7812V37.9667C135.597 38.3313 135.645 38.607 135.74 38.7939C135.836 38.9762 136.018 39.0673 136.287 39.0673C136.415 39.0673 136.549 39.0514 136.69 39.0195V39.7851C136.535 39.8216 136.378 39.8489 136.219 39.8671C136.059 39.8854 135.9 39.8945 135.74 39.8945C135.285 39.8945 134.952 39.776 134.742 39.539C134.537 39.2975 134.421 38.9215 134.394 38.4111H134.353C134.038 38.9762 133.671 39.3772 133.252 39.6142C132.837 39.8466 132.331 39.9628 131.734 39.9628ZM134.353 36.1757L133.006 36.2031C132.432 36.2076 131.994 36.2669 131.693 36.3808C131.393 36.4902 131.162 36.6588 131.003 36.8867C130.843 37.1145 130.764 37.413 130.764 37.7822C130.764 38.1832 130.871 38.4931 131.085 38.7119C131.304 38.9306 131.614 39.04 132.015 39.04C132.47 39.04 132.871 38.9374 133.218 38.7324C133.569 38.5273 133.844 38.247 134.045 37.8915C134.25 37.5315 134.353 37.1624 134.353 36.7841V36.1757ZM138.864 29.6816V30.8574H137.634V29.6816H138.864ZM138.864 32.4296V39.8261H137.634V32.4296H138.864ZM141.988 29.6816V39.8261H140.758V29.6816H141.988ZM145.762 39.9628C145.019 39.9628 144.461 39.7669 144.087 39.3749C143.713 38.983 143.526 38.4453 143.526 37.7617C143.526 36.996 143.777 36.4081 144.278 35.998C144.784 35.5878 145.598 35.3691 146.719 35.3417L148.38 35.3144V34.9111C148.38 34.3095 148.252 33.8788 147.997 33.6191C147.742 33.3593 147.341 33.2294 146.794 33.2294C146.243 33.2294 145.841 33.3229 145.591 33.5097C145.34 33.6966 145.19 33.9951 145.14 34.4052L143.854 34.289C144.064 32.9583 145.053 32.2929 146.821 32.2929C147.751 32.2929 148.451 32.5071 148.92 32.9355C149.389 33.3593 149.624 33.9745 149.624 34.7812V37.9667C149.624 38.3313 149.672 38.607 149.768 38.7939C149.863 38.9762 150.046 39.0673 150.314 39.0673C150.442 39.0673 150.576 39.0514 150.718 39.0195V39.7851C150.563 39.8216 150.406 39.8489 150.246 39.8671C150.087 39.8854 149.927 39.8945 149.768 39.8945C149.312 39.8945 148.979 39.776 148.77 39.539C148.564 39.2975 148.448 38.9215 148.421 38.4111H148.38C148.065 38.9762 147.699 39.3772 147.279 39.6142C146.865 39.8466 146.359 39.9628 145.762 39.9628ZM148.38 36.1757L147.033 36.2031C146.459 36.2076 146.021 36.2669 145.721 36.3808C145.42 36.4902 145.19 36.6588 145.03 36.8867C144.871 37.1145 144.791 37.413 144.791 37.7822C144.791 38.1832 144.898 38.4931 145.112 38.7119C145.331 38.9306 145.641 39.04 146.042 39.04C146.498 39.04 146.899 38.9374 147.245 38.7324C147.596 38.5273 147.872 38.247 148.072 37.8915C148.277 37.5315 148.38 37.1624 148.38 36.7841V36.1757ZM157.923 36.0937C157.923 37.3834 157.695 38.3518 157.239 38.999C156.788 39.6415 156.109 39.9628 155.202 39.9628C154.642 39.9628 154.174 39.8626 153.801 39.662C153.432 39.457 153.131 39.1288 152.898 38.6777H152.885C152.885 38.7688 152.88 38.901 152.871 39.0742C152.862 39.2473 152.853 39.4091 152.844 39.5595C152.835 39.7053 152.826 39.7942 152.816 39.8261H151.627C151.641 39.7031 151.65 39.5162 151.654 39.2656C151.663 39.0104 151.668 38.6891 151.668 38.3017V29.6816H152.898V32.5732C152.898 32.719 152.896 32.8808 152.892 33.0585C152.887 33.2317 152.88 33.4186 152.871 33.6191H152.898C153.126 33.1451 153.427 32.8056 153.801 32.6005C154.179 32.3954 154.646 32.2929 155.202 32.2929C156.136 32.2929 156.822 32.6074 157.26 33.2363C157.702 33.8652 157.923 34.8176 157.923 36.0937ZM156.631 36.1347C156.631 35.1002 156.494 34.3596 156.221 33.913C155.947 33.4664 155.503 33.2431 154.888 33.2431C154.195 33.2431 153.689 33.4801 153.37 33.954C153.056 34.428 152.898 35.18 152.898 36.2099C152.898 37.1806 153.053 37.8984 153.363 38.3632C153.673 38.8235 154.177 39.0536 154.874 39.0536C155.494 39.0536 155.94 38.8258 156.214 38.3701C156.492 37.9098 156.631 37.1647 156.631 36.1347ZM160.691 29.6816V39.8261H159.461V29.6816H160.691ZM163.521 36.3876C163.521 37.2353 163.697 37.8893 164.048 38.3495C164.399 38.8098 164.911 39.04 165.586 39.04C166.119 39.04 166.545 38.9329 166.864 38.7187C167.188 38.5045 167.407 38.2333 167.521 37.9052L168.601 38.2128C168.159 39.3795 167.154 39.9628 165.586 39.9628C164.492 39.9628 163.658 39.637 163.084 38.9853C162.514 38.3336 162.229 37.3652 162.229 36.08C162.229 34.8587 162.514 33.9221 163.084 33.2704C163.658 32.6188 164.476 32.2929 165.538 32.2929C166.627 32.2929 167.443 32.621 167.985 33.2773C168.528 33.9335 168.799 34.9156 168.799 36.2236V36.3876H163.521ZM167.527 35.4443C167.459 34.665 167.261 34.0976 166.933 33.7421C166.604 33.3821 166.133 33.2021 165.518 33.2021C164.921 33.2021 164.447 33.4026 164.096 33.8036C163.749 34.2001 163.562 34.747 163.535 35.4443H167.527ZM181.924 37.1122C181.924 37.969 181.612 38.6367 180.987 39.1152C180.363 39.5891 179.495 39.8261 178.383 39.8261H174.473V30.1943H177.973C179.103 30.1943 179.951 30.3902 180.516 30.7822C181.081 31.1695 181.363 31.7529 181.363 32.5322C181.363 33.1018 181.204 33.5803 180.885 33.9677C180.566 34.3551 180.115 34.6148 179.531 34.747C180.297 34.8382 180.887 35.0956 181.302 35.5195C181.716 35.9387 181.924 36.4697 181.924 37.1122ZM180.051 32.6894C180.051 32.1699 179.873 31.7984 179.518 31.5751C179.162 31.3518 178.647 31.2402 177.973 31.2402H175.778V34.289H177.973C178.67 34.289 179.189 34.1591 179.531 33.8994C179.878 33.635 180.051 33.2317 180.051 32.6894ZM180.604 37.0097C180.604 35.8749 179.807 35.3076 178.212 35.3076H175.778V38.7802H178.314C179.112 38.7802 179.693 38.6321 180.058 38.3359C180.422 38.0397 180.604 37.5976 180.604 37.0097ZM185.492 39.9628C184.749 39.9628 184.191 39.7669 183.817 39.3749C183.444 38.983 183.257 38.4453 183.257 37.7617C183.257 36.996 183.507 36.4081 184.009 35.998C184.515 35.5878 185.328 35.3691 186.449 35.3417L188.11 35.3144V34.9111C188.11 34.3095 187.983 33.8788 187.728 33.6191C187.472 33.3593 187.071 33.2294 186.524 33.2294C185.973 33.2294 185.572 33.3229 185.321 33.5097C185.071 33.6966 184.92 33.9951 184.87 34.4052L183.585 34.289C183.795 32.9583 184.784 32.2929 186.552 32.2929C187.481 32.2929 188.181 32.5071 188.65 32.9355C189.12 33.3593 189.354 33.9745 189.354 34.7812V37.9667C189.354 38.3313 189.402 38.607 189.498 38.7939C189.594 38.9762 189.776 39.0673 190.045 39.0673C190.173 39.0673 190.307 39.0514 190.448 39.0195V39.7851C190.293 39.8216 190.136 39.8489 189.977 39.8671C189.817 39.8854 189.658 39.8945 189.498 39.8945C189.042 39.8945 188.71 39.776 188.5 39.539C188.295 39.2975 188.179 38.9215 188.151 38.4111H188.11C187.796 38.9762 187.429 39.3772 187.01 39.6142C186.595 39.8466 186.089 39.9628 185.492 39.9628ZM188.11 36.1757L186.764 36.2031C186.189 36.2076 185.752 36.2669 185.451 36.3808C185.15 36.4902 184.92 36.6588 184.761 36.8867C184.601 37.1145 184.521 37.413 184.521 37.7822C184.521 38.1832 184.629 38.4931 184.843 38.7119C185.062 38.9306 185.371 39.04 185.772 39.04C186.228 39.04 186.629 38.9374 186.976 38.7324C187.326 38.5273 187.602 38.247 187.803 37.8915C188.008 37.5315 188.11 37.1624 188.11 36.7841V36.1757ZM192.629 29.6816V39.8261H191.398V29.6816H192.629ZM196.402 39.9628C195.66 39.9628 195.101 39.7669 194.728 39.3749C194.354 38.983 194.167 38.4453 194.167 37.7617C194.167 36.996 194.418 36.4081 194.919 35.998C195.425 35.5878 196.238 35.3691 197.359 35.3417L199.021 35.3144V34.9111C199.021 34.3095 198.893 33.8788 198.638 33.6191C198.382 33.3593 197.981 33.2294 197.435 33.2294C196.883 33.2294 196.482 33.3229 196.231 33.5097C195.981 33.6966 195.83 33.9951 195.78 34.4052L194.495 34.289C194.705 32.9583 195.694 32.2929 197.462 32.2929C198.392 32.2929 199.091 32.5071 199.561 32.9355C200.03 33.3593 200.265 33.9745 200.265 34.7812V37.9667C200.265 38.3313 200.312 38.607 200.408 38.7939C200.504 38.9762 200.686 39.0673 200.955 39.0673C201.083 39.0673 201.217 39.0514 201.358 39.0195V39.7851C201.203 39.8216 201.046 39.8489 200.887 39.8671C200.727 39.8854 200.568 39.8945 200.408 39.8945C199.952 39.8945 199.62 39.776 199.41 39.539C199.205 39.2975 199.089 38.9215 199.062 38.4111H199.021C198.706 38.9762 198.339 39.3772 197.92 39.6142C197.505 39.8466 196.999 39.9628 196.402 39.9628ZM199.021 36.1757L197.674 36.2031C197.1 36.2076 196.662 36.2669 196.361 36.3808C196.061 36.4902 195.83 36.6588 195.671 36.8867C195.511 37.1145 195.432 37.413 195.432 37.7822C195.432 38.1832 195.539 38.4931 195.753 38.7119C195.972 38.9306 196.282 39.04 196.683 39.04C197.138 39.04 197.539 38.9374 197.886 38.7324C198.237 38.5273 198.512 38.247 198.713 37.8915C198.918 37.5315 199.021 37.1624 199.021 36.7841V36.1757ZM203.566 35.54V39.8261H202.336V34.0087C202.336 33.5758 202.331 33.2294 202.322 32.9697C202.318 32.7053 202.309 32.5253 202.295 32.4296H203.457C203.466 32.5162 203.473 32.6256 203.478 32.7578C203.487 32.8899 203.493 33.0357 203.498 33.1953C203.503 33.3548 203.507 33.5211 203.512 33.6943H203.532C203.815 33.1839 204.141 32.8238 204.51 32.6142C204.883 32.4 205.346 32.2929 205.897 32.2929C206.709 32.2929 207.301 32.5003 207.675 32.915C208.053 33.3297 208.242 33.9905 208.242 34.8974V39.8261H207.005V35.1367C207.005 34.4303 206.891 33.9381 206.663 33.6601C206.435 33.3821 206.041 33.2431 205.48 33.2431C204.888 33.2431 204.421 33.4459 204.079 33.8515C203.737 34.2571 203.566 34.8199 203.566 35.54ZM212.938 39.9628C211.904 39.9628 211.113 39.637 210.566 38.9853C210.024 38.329 209.753 37.3743 209.753 36.121C209.753 34.8769 210.026 33.929 210.573 33.2773C211.12 32.621 211.904 32.2929 212.925 32.2929C213.681 32.2929 214.308 32.4889 214.805 32.8808C215.306 33.2727 215.62 33.8128 215.748 34.5009L214.483 34.5966C214.42 34.1865 214.258 33.8606 213.998 33.6191C213.738 33.3775 213.369 33.2568 212.891 33.2568C212.239 33.2568 211.767 33.4732 211.476 33.9062C211.184 34.3391 211.038 35.0683 211.038 36.0937C211.038 37.0781 211.193 37.8072 211.503 38.2812C211.813 38.7551 212.28 38.9921 212.904 38.9921C213.342 38.9921 213.706 38.8736 213.998 38.6367C214.294 38.3997 214.477 38.0351 214.545 37.5429L215.789 37.6249C215.725 38.0989 215.566 38.5113 215.311 38.8622C215.06 39.2132 214.732 39.4843 214.326 39.6757C213.925 39.8671 213.463 39.9628 212.938 39.9628ZM218.045 36.3876C218.045 37.2353 218.22 37.8893 218.571 38.3495C218.922 38.8098 219.435 39.04 220.109 39.04C220.643 39.04 221.069 38.9329 221.388 38.7187C221.711 38.5045 221.93 38.2333 222.044 37.9052L223.124 38.2128C222.682 39.3795 221.677 39.9628 220.109 39.9628C219.016 39.9628 218.182 39.637 217.607 38.9853C217.038 38.3336 216.753 37.3652 216.753 36.08C216.753 34.8587 217.038 33.9221 217.607 33.2704C218.182 32.6188 219 32.2929 220.062 32.2929C221.151 32.2929 221.966 32.621 222.509 33.2773C223.051 33.9335 223.322 34.9156 223.322 36.2236V36.3876H218.045ZM222.051 35.4443C221.982 34.665 221.784 34.0976 221.456 33.7421C221.128 33.3821 220.656 33.2021 220.041 33.2021C219.444 33.2021 218.97 33.4026 218.619 33.8036C218.273 34.2001 218.086 34.747 218.059 35.4443H222.051Z" fill="#4A5565" />
                                        <path d="M60.5962 90.8016C57.2681 90.6609 54.6353 89.8875 52.6978 88.4813C50.7603 87.075 49.5181 85.0438 48.9712 82.3875L52.9556 81.5203C53.3462 83.3797 54.1587 84.7781 55.3931 85.7156C56.6431 86.6531 58.3774 87.1922 60.5962 87.3328V75.7078C59.6743 75.4734 58.8462 75.2547 58.1118 75.0516C57.3931 74.8328 56.7603 74.6219 56.2134 74.4188C55.6821 74.2156 55.2368 74.0281 54.8774 73.8563C53.2993 73.0281 52.1665 72.0672 51.479 70.9734C50.8071 69.8641 50.4712 68.4578 50.4712 66.7547C50.4712 64.3328 51.3462 62.4422 53.0962 61.0828C54.8618 59.7078 57.3618 58.95 60.5962 58.8094V55.7391H63.5024V58.8094C65.4556 58.9031 67.104 59.2234 68.4478 59.7703C69.7915 60.3172 70.8853 61.1297 71.729 62.2078C72.5728 63.2703 73.2134 64.6375 73.6509 66.3094L69.5728 67.0828C69.2603 65.6141 68.6274 64.4734 67.6743 63.6609C66.7212 62.8328 65.3306 62.3328 63.5024 62.1609V72.5906C64.8931 72.9188 66.0884 73.2391 67.0884 73.5516C68.0884 73.8484 68.8853 74.1297 69.479 74.3953C71.2603 75.2234 72.5181 76.2234 73.2524 77.3953C74.0024 78.5672 74.3774 80.0984 74.3774 81.9891C74.3774 84.5672 73.4321 86.6375 71.5415 88.2C69.6509 89.7625 66.9712 90.6297 63.5024 90.8016V94.5984H60.5962V90.8016ZM54.5024 66.7078C54.5024 67.6453 54.6978 68.4266 55.0884 69.0516C55.479 69.6922 56.0571 70.2313 56.8228 70.6688C57.604 71.1063 58.8618 71.5438 60.5962 71.9813V62.1141C56.5337 62.3328 54.5024 63.8641 54.5024 66.7078ZM70.3462 82.0359C70.3462 81.0203 70.1431 80.1844 69.7368 79.5281C69.3306 78.8719 68.7446 78.325 67.979 77.8875C67.2134 77.4656 65.7212 76.9656 63.5024 76.3875V87.3563C65.7056 87.2156 67.3931 86.6922 68.5649 85.7859C69.7524 84.8797 70.3462 83.6297 70.3462 82.0359ZM99.5259 87.6844V91.2703H78.8306V87.6844H87.2446V62.2781L79.7915 67.5984V63.6141L87.5962 58.2469H91.4868V87.6844H99.5259ZM126.174 87.6844V91.2703H104.307V88.2938C105.104 86.4656 106.065 84.8484 107.19 83.4422C108.331 82.0359 109.542 80.7703 110.823 79.6453C112.104 78.5203 113.37 77.4734 114.62 76.5047C115.245 76.0203 115.831 75.5359 116.377 75.0516C116.94 74.5672 117.471 74.0828 117.971 73.5984C118.971 72.6297 119.776 71.6141 120.385 70.5516C121.01 69.4891 121.323 68.2859 121.323 66.9422C121.323 65.1297 120.792 63.7234 119.729 62.7234C118.667 61.7234 117.19 61.2234 115.299 61.2234C113.502 61.2234 112.018 61.7156 110.846 62.7C109.69 63.6688 109.01 65.0359 108.807 66.8016L104.495 66.4031C104.807 63.7625 105.924 61.6609 107.846 60.0984C109.784 58.5359 112.268 57.7547 115.299 57.7547C118.627 57.7547 121.182 58.5438 122.963 60.1219C124.76 61.6844 125.659 63.9109 125.659 66.8016C125.659 68.0828 125.362 69.3563 124.768 70.6219C124.19 71.8875 123.323 73.1531 122.167 74.4188C121.588 75.0438 120.745 75.8484 119.635 76.8328C118.526 77.8172 117.159 78.9734 115.534 80.3016C113.737 81.7703 112.307 83.0984 111.245 84.2859C110.182 85.4578 109.417 86.5906 108.948 87.6844H126.174ZM137.635 90.075C137.635 91.7313 137.487 93.1141 137.19 94.2234C136.893 95.3328 136.432 96.3953 135.807 97.4109H132.924C133.659 96.3484 134.206 95.3016 134.565 94.2703C134.94 93.2547 135.127 92.2547 135.127 91.2703H133.065V86.1375H137.635V90.075ZM162.62 83.7938V91.2703H158.635V83.7938H143.073V80.5125L158.19 58.2469H162.62V80.4656H167.26V83.7938H162.62ZM146.963 80.4656H158.635V67.2938C158.635 66.575 158.635 65.8641 158.635 65.1609C158.651 64.4422 158.682 63.7234 158.729 63.0047C158.37 63.6922 158.057 64.2547 157.792 64.6922C157.526 65.1141 157.284 65.4813 157.065 65.7938L146.963 80.4656ZM193.37 80.5125C193.37 83.9969 192.331 86.7391 190.252 88.7391C188.19 90.7391 185.323 91.7391 181.651 91.7391C178.573 91.7391 176.088 91.0672 174.198 89.7234C172.307 88.3797 171.112 86.4344 170.612 83.8875L174.877 83.3953C175.331 85.0203 176.127 86.2469 177.268 87.075C178.409 87.8875 179.901 88.2938 181.745 88.2938C184.01 88.2938 185.784 87.6141 187.065 86.2547C188.346 84.8797 188.987 82.9969 188.987 80.6063C188.987 78.5281 188.338 76.8484 187.042 75.5672C185.76 74.2859 184.026 73.6453 181.838 73.6453C180.698 73.6453 179.635 73.825 178.651 74.1844C177.667 74.5438 176.682 75.1531 175.698 76.0125H171.573L172.674 58.2469H191.448V61.8328H176.518L175.885 72.3094C177.713 70.9031 179.987 70.2 182.706 70.2C184.877 70.2 186.76 70.6375 188.354 71.5125C189.948 72.3719 191.182 73.575 192.057 75.1219C192.932 76.6688 193.37 78.4656 193.37 80.5125ZM220.018 82.0594C220.018 85.1063 219.049 87.4813 217.112 89.1844C215.174 90.8875 212.393 91.7391 208.768 91.7391C205.237 91.7391 202.471 90.9031 200.471 89.2313C198.487 87.5594 197.495 85.1844 197.495 82.1063C197.495 79.95 198.112 78.1375 199.346 76.6688C200.581 75.2 202.159 74.3094 204.081 73.9969V73.9031C202.284 73.4813 200.862 72.5672 199.815 71.1609C198.784 69.7547 198.268 68.1063 198.268 66.2156C198.268 63.7 199.206 61.6609 201.081 60.0984C202.971 58.5359 205.502 57.7547 208.674 57.7547C211.924 57.7547 214.487 58.5203 216.362 60.0516C218.252 61.5828 219.198 63.6531 219.198 66.2625C219.198 68.1531 218.674 69.8016 217.627 71.2078C216.581 72.6141 215.151 73.4969 213.338 73.8563V73.95C215.448 74.2938 217.088 75.1922 218.26 76.6453C219.432 78.0828 220.018 79.8875 220.018 82.0594ZM214.815 66.4969C214.815 62.7625 212.768 60.8953 208.674 60.8953C204.612 60.8953 202.581 62.7625 202.581 66.4969C202.581 68.3875 203.112 69.8328 204.174 70.8328C205.252 71.8172 206.768 72.3094 208.721 72.3094C210.706 72.3094 212.213 71.8563 213.245 70.95C214.292 70.0281 214.815 68.5438 214.815 66.4969ZM215.635 81.6609C215.635 79.6141 215.026 78.075 213.807 77.0438C212.588 75.9969 210.877 75.4734 208.674 75.4734C206.534 75.4734 204.862 76.0359 203.659 77.1609C202.456 78.2703 201.854 79.8016 201.854 81.7547C201.854 84.0203 202.432 85.7234 203.588 86.8641C204.76 88.0047 206.502 88.575 208.815 88.575C211.112 88.575 212.823 88.0281 213.948 86.9344C215.073 85.825 215.635 84.0672 215.635 81.6609ZM231.081 86.1375V91.2703H226.51V86.1375H231.081ZM260.167 80.5125C260.167 83.9969 259.127 86.7391 257.049 88.7391C254.987 90.7391 252.12 91.7391 248.448 91.7391C245.37 91.7391 242.885 91.0672 240.995 89.7234C239.104 88.3797 237.909 86.4344 237.409 83.8875L241.674 83.3953C242.127 85.0203 242.924 86.2469 244.065 87.075C245.206 87.8875 246.698 88.2938 248.542 88.2938C250.807 88.2938 252.581 87.6141 253.862 86.2547C255.143 84.8797 255.784 82.9969 255.784 80.6063C255.784 78.5281 255.135 76.8484 253.838 75.5672C252.557 74.2859 250.823 73.6453 248.635 73.6453C247.495 73.6453 246.432 73.825 245.448 74.1844C244.463 74.5438 243.479 75.1531 242.495 76.0125H238.37L239.471 58.2469H258.245V61.8328H243.315L242.682 72.3094C244.51 70.9031 246.784 70.2 249.502 70.2C251.674 70.2 253.557 70.6375 255.151 71.5125C256.745 72.3719 257.979 73.575 258.854 75.1219C259.729 76.6688 260.167 78.4656 260.167 80.5125ZM287.026 74.7469C287.026 80.2625 286.049 84.4734 284.096 87.3797C282.159 90.2859 279.292 91.7391 275.495 91.7391C271.698 91.7391 268.846 90.2938 266.94 87.4031C265.034 84.5125 264.081 80.2938 264.081 74.7469C264.081 69.075 265.002 64.825 266.846 61.9969C268.706 59.1688 271.635 57.7547 275.635 57.7547C279.526 57.7547 282.393 59.1844 284.237 62.0438C286.096 64.9031 287.026 69.1375 287.026 74.7469ZM282.737 74.7469C282.737 71.5594 282.495 68.9734 282.01 66.9891C281.542 64.9891 280.784 63.5203 279.737 62.5828C278.69 61.6453 277.323 61.1766 275.635 61.1766C273.917 61.1766 272.518 61.6375 271.44 62.5594C270.362 63.4813 269.573 64.9422 269.073 66.9422C268.588 68.9266 268.346 71.5281 268.346 74.7469C268.346 77.8719 268.596 80.4344 269.096 82.4344C269.612 84.4344 270.401 85.9109 271.463 86.8641C272.526 87.8172 273.885 88.2938 275.542 88.2938C278.026 88.2938 279.846 87.1844 281.002 84.9656C282.159 82.7469 282.737 79.3406 282.737 74.7469Z" fill="#101828" />
                                        <path d="M38.8325 164.242L37.5669 167.461H36.02L40.5122 156.453H42.2075L46.6294 167.461H45.106L43.8481 164.242H38.8325ZM41.3403 157.578C41.2518 157.87 41.145 158.195 41.02 158.555C40.9002 158.909 40.7882 159.221 40.6841 159.492L39.2856 163.078H43.4028L41.9888 159.445C41.9159 159.263 41.8195 159.005 41.6997 158.672C41.5799 158.338 41.4601 157.974 41.3403 157.578ZM50.981 167.617C49.7987 167.617 48.895 167.245 48.27 166.5C47.6502 165.75 47.3403 164.659 47.3403 163.226C47.3403 161.805 47.6528 160.721 48.2778 159.976C48.9028 159.226 49.7987 158.851 50.9653 158.851C51.8299 158.851 52.5461 159.075 53.1138 159.523C53.6867 159.971 54.0461 160.588 54.1919 161.375L52.7466 161.484C52.6737 161.015 52.4888 160.643 52.1919 160.367C51.895 160.091 51.4731 159.953 50.9263 159.953C50.1815 159.953 49.6424 160.2 49.3091 160.695C48.9757 161.19 48.8091 162.023 48.8091 163.195C48.8091 164.32 48.9862 165.153 49.3403 165.695C49.6945 166.237 50.2284 166.508 50.9419 166.508C51.4419 166.508 51.8586 166.372 52.1919 166.101C52.5304 165.831 52.7388 165.414 52.8169 164.851L54.2388 164.945C54.1659 165.487 53.9836 165.958 53.6919 166.359C53.4054 166.76 53.0304 167.07 52.5669 167.289C52.1086 167.508 51.5799 167.617 50.981 167.617ZM58.981 167.617C57.7987 167.617 56.895 167.245 56.27 166.5C55.6502 165.75 55.3403 164.659 55.3403 163.226C55.3403 161.805 55.6528 160.721 56.2778 159.976C56.9028 159.226 57.7987 158.851 58.9653 158.851C59.8299 158.851 60.5461 159.075 61.1138 159.523C61.6867 159.971 62.0461 160.588 62.1919 161.375L60.7466 161.484C60.6737 161.015 60.4888 160.643 60.1919 160.367C59.895 160.091 59.4731 159.953 58.9263 159.953C58.1815 159.953 57.6424 160.2 57.3091 160.695C56.9757 161.19 56.8091 162.023 56.8091 163.195C56.8091 164.32 56.9862 165.153 57.3403 165.695C57.6945 166.237 58.2284 166.508 58.9419 166.508C59.4419 166.508 59.8586 166.372 60.1919 166.101C60.5304 165.831 60.7388 165.414 60.8169 164.851L62.2388 164.945C62.1659 165.487 61.9836 165.958 61.6919 166.359C61.4054 166.76 61.0304 167.07 60.5669 167.289C60.1086 167.508 59.5799 167.617 58.981 167.617ZM70.8872 163.226C70.8872 164.706 70.5617 165.807 69.9106 166.531C69.2596 167.255 68.3143 167.617 67.0747 167.617C65.8403 167.617 64.908 167.242 64.2778 166.492C63.6476 165.737 63.3325 164.648 63.3325 163.226C63.3325 161.768 63.6476 160.674 64.2778 159.945C64.9132 159.216 65.8612 158.851 67.1216 158.851C68.4132 158.851 69.3638 159.208 69.9731 159.922C70.5825 160.63 70.8872 161.732 70.8872 163.226ZM69.4106 163.226C69.4106 162.06 69.2362 161.213 68.8872 160.687C68.5435 160.156 67.9627 159.89 67.145 159.89C66.3221 159.89 65.7257 160.161 65.356 160.703C64.9914 161.239 64.8091 162.081 64.8091 163.226C64.8091 164.341 64.9888 165.18 65.3481 165.742C65.7127 166.299 66.283 166.578 67.0591 166.578C67.9028 166.578 68.5044 166.307 68.8638 165.765C69.2284 165.224 69.4106 164.377 69.4106 163.226ZM77.9888 166.015C77.6659 166.599 77.2909 167.013 76.8638 167.258C76.4419 167.497 75.9159 167.617 75.2856 167.617C74.3586 167.617 73.6789 167.388 73.2466 166.93C72.8195 166.466 72.606 165.703 72.606 164.64V159.008H74.02V164.367C74.02 165.211 74.1502 165.784 74.4106 166.086C74.6763 166.383 75.1268 166.531 75.7622 166.531C76.4393 166.531 76.9731 166.299 77.3638 165.836C77.7544 165.372 77.9497 164.729 77.9497 163.906V159.008H79.356V165.656C79.356 166.146 79.3586 166.541 79.3638 166.844C79.3742 167.146 79.3872 167.351 79.4028 167.461H78.0747C78.0695 167.435 78.0591 167.312 78.0435 167.094C78.033 166.875 78.0226 166.515 78.0122 166.015H77.9888ZM82.9888 162.562V167.461H81.5825V160.812C81.5825 160.318 81.5773 159.922 81.5669 159.625C81.5617 159.323 81.5513 159.117 81.5356 159.008H82.8638C82.8742 159.107 82.882 159.232 82.8872 159.383C82.8976 159.534 82.9054 159.7 82.9106 159.883C82.9159 160.065 82.9211 160.255 82.9263 160.453H82.9497C83.2726 159.87 83.645 159.458 84.0669 159.219C84.494 158.974 85.0226 158.851 85.6528 158.851C86.5799 158.851 87.257 159.088 87.6841 159.562C88.1164 160.036 88.3325 160.791 88.3325 161.828V167.461H86.9185V162.101C86.9185 161.294 86.7882 160.732 86.5278 160.414C86.2674 160.096 85.8169 159.937 85.1763 159.937C84.4992 159.937 83.9653 160.169 83.5747 160.633C83.1841 161.096 82.9888 161.739 82.9888 162.562ZM93.7075 167.398C93.2492 167.523 92.7752 167.586 92.2856 167.586C91.7231 167.586 91.3013 167.427 91.02 167.109C90.7388 166.786 90.5981 166.307 90.5981 165.672V160.031H89.6216V159.008H90.6528L91.0669 157.117H92.0044V159.008H93.5669V160.031H92.0044V165.367C92.0044 165.773 92.0695 166.06 92.1997 166.226C92.3351 166.388 92.5669 166.469 92.895 166.469C93.0721 166.469 93.3429 166.432 93.7075 166.359V167.398ZM101.09 162.359V167.461H99.5981V156.453H101.09V161.109H107.043V156.453H108.536V167.461H107.043V162.359H101.09ZM118.075 163.226C118.075 164.706 117.749 165.807 117.098 166.531C116.447 167.255 115.502 167.617 114.262 167.617C113.028 167.617 112.096 167.242 111.465 166.492C110.835 165.737 110.52 164.648 110.52 163.226C110.52 161.768 110.835 160.674 111.465 159.945C112.101 159.216 113.049 158.851 114.309 158.851C115.601 158.851 116.551 159.208 117.161 159.922C117.77 160.63 118.075 161.732 118.075 163.226ZM116.598 163.226C116.598 162.06 116.424 161.213 116.075 160.687C115.731 160.156 115.15 159.89 114.333 159.89C113.51 159.89 112.913 160.161 112.543 160.703C112.179 161.239 111.997 162.081 111.997 163.226C111.997 164.341 112.176 165.18 112.536 165.742C112.9 166.299 113.471 166.578 114.247 166.578C115.09 166.578 115.692 166.307 116.051 165.765C116.416 165.224 116.598 164.377 116.598 163.226ZM121.239 155.867V167.461H119.833V155.867H121.239ZM128.84 167.461C128.83 167.403 128.817 167.297 128.801 167.14C128.791 166.979 128.78 166.802 128.77 166.609C128.765 166.416 128.762 166.247 128.762 166.101H128.731C128.471 166.643 128.124 167.031 127.692 167.265C127.265 167.5 126.734 167.617 126.098 167.617C125.03 167.617 124.244 167.258 123.739 166.539C123.239 165.82 122.989 164.732 122.989 163.273C122.989 161.799 123.247 160.695 123.762 159.961C124.283 159.221 125.062 158.851 126.098 158.851C126.739 158.851 127.273 158.969 127.7 159.203C128.127 159.437 128.471 159.81 128.731 160.32H128.747L128.731 159.375V155.867H130.137V165.719C130.137 166.161 130.14 166.528 130.145 166.82C130.155 167.107 130.168 167.32 130.184 167.461H128.84ZM124.465 163.226C124.465 164.409 124.622 165.255 124.934 165.765C125.247 166.276 125.754 166.531 126.458 166.531C127.254 166.531 127.833 166.255 128.192 165.703C128.551 165.151 128.731 164.294 128.731 163.133C128.731 162.013 128.551 161.193 128.192 160.672C127.833 160.151 127.26 159.89 126.473 159.89C125.765 159.89 125.252 160.153 124.934 160.68C124.622 161.2 124.465 162.049 124.465 163.226ZM133.379 163.531C133.379 164.5 133.58 165.247 133.981 165.773C134.382 166.299 134.968 166.562 135.739 166.562C136.348 166.562 136.835 166.44 137.2 166.195C137.569 165.95 137.819 165.64 137.95 165.265L139.184 165.617C138.679 166.95 137.53 167.617 135.739 167.617C134.489 167.617 133.536 167.245 132.879 166.5C132.228 165.755 131.903 164.648 131.903 163.18C131.903 161.784 132.228 160.713 132.879 159.969C133.536 159.224 134.471 158.851 135.684 158.851C136.929 158.851 137.861 159.226 138.481 159.976C139.101 160.726 139.411 161.849 139.411 163.344V163.531H133.379ZM137.958 162.453C137.879 161.562 137.653 160.914 137.278 160.508C136.903 160.096 136.364 159.89 135.661 159.89C134.978 159.89 134.437 160.12 134.036 160.578C133.64 161.031 133.426 161.656 133.395 162.453H137.958ZM142.645 163.055V167.461H141.239V160.976C141.239 160.68 141.234 160.367 141.223 160.039C141.218 159.711 141.208 159.367 141.192 159.008H142.52C142.53 159.247 142.538 159.463 142.543 159.656C142.554 159.849 142.562 160.018 142.567 160.164C142.572 160.305 142.575 160.424 142.575 160.523C142.58 160.617 142.583 160.687 142.583 160.734H142.614C142.77 160.224 142.942 159.828 143.129 159.547C143.312 159.286 143.52 159.107 143.754 159.008C143.989 158.903 144.278 158.851 144.622 158.851C144.814 158.851 145.004 158.877 145.192 158.93V160.219C145.015 160.166 144.765 160.14 144.442 160.14C143.859 160.14 143.413 160.393 143.106 160.898C142.799 161.398 142.645 162.117 142.645 163.055Z" fill="#4A5565" />
                                        <path d="M268.219 163.06L267.289 163.622L266.117 161.607L264.898 163.607L263.969 163.044L265.445 161.107L263.258 160.536L263.609 159.49L265.695 160.326L265.602 158.005H266.664L266.562 160.31L268.625 159.505L268.977 160.536L266.773 161.107L268.219 163.06ZM274.453 163.06L273.523 163.622L272.352 161.607L271.133 163.607L270.203 163.044L271.68 161.107L269.492 160.536L269.844 159.49L271.93 160.326L271.836 158.005H272.898L272.797 160.31L274.859 159.505L275.211 160.536L273.008 161.107L274.453 163.06ZM280.688 163.06L279.758 163.622L278.586 161.607L277.367 163.607L276.438 163.044L277.914 161.107L275.727 160.536L276.078 159.49L278.164 160.326L278.07 158.005H279.133L279.031 160.31L281.094 159.505L281.445 160.536L279.242 161.107L280.688 163.06ZM286.922 163.06L285.992 163.622L284.82 161.607L283.602 163.607L282.672 163.044L284.148 161.107L281.961 160.536L282.312 159.49L284.398 160.326L284.305 158.005H285.367L285.266 160.31L287.328 159.505L287.68 160.536L285.477 161.107L286.922 163.06ZM293.156 163.06L292.227 163.622L291.055 161.607L289.836 163.607L288.906 163.044L290.383 161.107L288.195 160.536L288.547 159.49L290.633 160.326L290.539 158.005H291.602L291.5 160.31L293.562 159.505L293.914 160.536L291.711 161.107L293.156 163.06ZM299.391 163.06L298.461 163.622L297.289 161.607L296.07 163.607L295.141 163.044L296.617 161.107L294.43 160.536L294.781 159.49L296.867 160.326L296.773 158.005H297.836L297.734 160.31L299.797 159.505L300.148 160.536L297.945 161.107L299.391 163.06Z" fill="#101828" />
                                        <path d="M38.8325 204.228L37.5669 207.447H36.02L40.5122 196.439H42.2075L46.6294 207.447H45.106L43.8481 204.228H38.8325ZM41.3403 197.564C41.2518 197.855 41.145 198.181 41.02 198.54C40.9002 198.895 40.7882 199.207 40.6841 199.478L39.2856 203.064H43.4028L41.9888 199.431C41.9159 199.249 41.8195 198.991 41.6997 198.658C41.5799 198.324 41.4601 197.96 41.3403 197.564ZM50.981 207.603C49.7987 207.603 48.895 207.23 48.27 206.486C47.6502 205.736 47.3403 204.645 47.3403 203.212C47.3403 201.79 47.6528 200.707 48.2778 199.962C48.9028 199.212 49.7987 198.837 50.9653 198.837C51.8299 198.837 52.5461 199.061 53.1138 199.509C53.6867 199.957 54.0461 200.574 54.1919 201.361L52.7466 201.47C52.6737 201.001 52.4888 200.629 52.1919 200.353C51.895 200.077 51.4731 199.939 50.9263 199.939C50.1815 199.939 49.6424 200.186 49.3091 200.681C48.9757 201.176 48.8091 202.009 48.8091 203.181C48.8091 204.306 48.9862 205.139 49.3403 205.681C49.6945 206.223 50.2284 206.493 50.9419 206.493C51.4419 206.493 51.8586 206.358 52.1919 206.087C52.5304 205.816 52.7388 205.4 52.8169 204.837L54.2388 204.931C54.1659 205.473 53.9836 205.944 53.6919 206.345C53.4054 206.746 53.0304 207.056 52.5669 207.275C52.1086 207.493 51.5799 207.603 50.981 207.603ZM58.981 207.603C57.7987 207.603 56.895 207.23 56.27 206.486C55.6502 205.736 55.3403 204.645 55.3403 203.212C55.3403 201.79 55.6528 200.707 56.2778 199.962C56.9028 199.212 57.7987 198.837 58.9653 198.837C59.8299 198.837 60.5461 199.061 61.1138 199.509C61.6867 199.957 62.0461 200.574 62.1919 201.361L60.7466 201.47C60.6737 201.001 60.4888 200.629 60.1919 200.353C59.895 200.077 59.4731 199.939 58.9263 199.939C58.1815 199.939 57.6424 200.186 57.3091 200.681C56.9757 201.176 56.8091 202.009 56.8091 203.181C56.8091 204.306 56.9862 205.139 57.3403 205.681C57.6945 206.223 58.2284 206.493 58.9419 206.493C59.4419 206.493 59.8586 206.358 60.1919 206.087C60.5304 205.816 60.7388 205.4 60.8169 204.837L62.2388 204.931C62.1659 205.473 61.9836 205.944 61.6919 206.345C61.4054 206.746 61.0304 207.056 60.5669 207.275C60.1086 207.493 59.5799 207.603 58.981 207.603ZM70.8872 203.212C70.8872 204.691 70.5617 205.793 69.9106 206.517C69.2596 207.241 68.3143 207.603 67.0747 207.603C65.8403 207.603 64.908 207.228 64.2778 206.478C63.6476 205.723 63.3325 204.634 63.3325 203.212C63.3325 201.754 63.6476 200.66 64.2778 199.931C64.9132 199.202 65.8612 198.837 67.1216 198.837C68.4132 198.837 69.3638 199.194 69.9731 199.908C70.5825 200.616 70.8872 201.717 70.8872 203.212ZM69.4106 203.212C69.4106 202.046 69.2362 201.199 68.8872 200.673C68.5435 200.142 67.9627 199.876 67.145 199.876C66.3221 199.876 65.7257 200.147 65.356 200.689C64.9914 201.225 64.8091 202.066 64.8091 203.212C64.8091 204.327 64.9888 205.165 65.3481 205.728C65.7127 206.285 66.283 206.564 67.0591 206.564C67.9028 206.564 68.5044 206.293 68.8638 205.751C69.2284 205.21 69.4106 204.363 69.4106 203.212ZM77.9888 206.001C77.6659 206.585 77.2909 206.999 76.8638 207.243C76.4419 207.483 75.9159 207.603 75.2856 207.603C74.3586 207.603 73.6789 207.374 73.2466 206.915C72.8195 206.452 72.606 205.689 72.606 204.626V198.993H74.02V204.353C74.02 205.197 74.1502 205.77 74.4106 206.072C74.6763 206.368 75.1268 206.517 75.7622 206.517C76.4393 206.517 76.9731 206.285 77.3638 205.822C77.7544 205.358 77.9497 204.715 77.9497 203.892V198.993H79.356V205.642C79.356 206.131 79.3586 206.527 79.3638 206.829C79.3742 207.131 79.3872 207.337 79.4028 207.447H78.0747C78.0695 207.421 78.0591 207.298 78.0435 207.079C78.033 206.861 78.0226 206.501 78.0122 206.001H77.9888ZM82.9888 202.548V207.447H81.5825V200.798C81.5825 200.303 81.5773 199.908 81.5669 199.611C81.5617 199.309 81.5513 199.103 81.5356 198.993H82.8638C82.8742 199.092 82.882 199.217 82.8872 199.368C82.8976 199.52 82.9054 199.686 82.9106 199.868C82.9159 200.051 82.9211 200.241 82.9263 200.439H82.9497C83.2726 199.855 83.645 199.444 84.0669 199.204C84.494 198.96 85.0226 198.837 85.6528 198.837C86.5799 198.837 87.257 199.074 87.6841 199.548C88.1164 200.022 88.3325 200.777 88.3325 201.814V207.447H86.9185V202.087C86.9185 201.28 86.7882 200.717 86.5278 200.4C86.2674 200.082 85.8169 199.923 85.1763 199.923C84.4992 199.923 83.9653 200.155 83.5747 200.618C83.1841 201.082 82.9888 201.725 82.9888 202.548ZM93.7075 207.384C93.2492 207.509 92.7752 207.572 92.2856 207.572C91.7231 207.572 91.3013 207.413 91.02 207.095C90.7388 206.772 90.5981 206.293 90.5981 205.658V200.017H89.6216V198.993H90.6528L91.0669 197.103H92.0044V198.993H93.5669V200.017H92.0044V205.353C92.0044 205.759 92.0695 206.046 92.1997 206.212C92.3351 206.374 92.5669 206.454 92.895 206.454C93.0721 206.454 93.3429 206.418 93.7075 206.345V207.384ZM100.926 200.134V207.447H99.5981V196.439H101.333L107.286 205.876C107.223 204.85 107.192 204.111 107.192 203.658V196.439H108.536V207.447H106.739L100.848 198.072C100.859 198.415 100.874 198.759 100.895 199.103C100.916 199.447 100.926 199.79 100.926 200.134ZM116.27 206.001C115.947 206.585 115.572 206.999 115.145 207.243C114.723 207.483 114.197 207.603 113.567 207.603C112.64 207.603 111.96 207.374 111.528 206.915C111.101 206.452 110.887 205.689 110.887 204.626V198.993H112.301V204.353C112.301 205.197 112.431 205.77 112.692 206.072C112.958 206.368 113.408 206.517 114.043 206.517C114.721 206.517 115.254 206.285 115.645 205.822C116.036 205.358 116.231 204.715 116.231 203.892V198.993H117.637V205.642C117.637 206.131 117.64 206.527 117.645 206.829C117.655 207.131 117.668 207.337 117.684 207.447H116.356C116.351 207.421 116.34 207.298 116.325 207.079C116.314 206.861 116.304 206.501 116.293 206.001H116.27ZM121.262 202.548V207.447H119.864V200.798C119.864 200.303 119.859 199.908 119.848 199.611C119.843 199.309 119.833 199.103 119.817 198.993H121.145C121.155 199.108 121.166 199.249 121.176 199.415C121.187 199.582 121.194 199.756 121.2 199.939C121.205 200.116 121.208 200.283 121.208 200.439H121.231C121.533 199.84 121.879 199.423 122.27 199.189C122.661 198.954 123.137 198.837 123.7 198.837C124.34 198.837 124.846 198.965 125.215 199.22C125.59 199.475 125.851 199.881 125.997 200.439H126.02C126.312 199.871 126.663 199.462 127.075 199.212C127.491 198.962 127.994 198.837 128.583 198.837C129.437 198.837 130.056 199.069 130.442 199.533C130.833 199.996 131.028 200.756 131.028 201.814V207.447H129.637V202.087C129.637 201.27 129.525 200.704 129.301 200.392C129.077 200.079 128.674 199.923 128.09 199.923C127.476 199.923 126.997 200.152 126.653 200.611C126.314 201.064 126.145 201.71 126.145 202.548V207.447H124.754V202.087C124.754 201.27 124.642 200.704 124.418 200.392C124.194 200.079 123.791 199.923 123.208 199.923C122.609 199.923 122.135 200.152 121.786 200.611C121.437 201.069 121.262 201.715 121.262 202.548ZM140.309 203.181C140.309 204.655 140.049 205.762 139.528 206.501C139.012 207.236 138.236 207.603 137.2 207.603C136.559 207.603 136.025 207.488 135.598 207.259C135.176 207.025 134.833 206.65 134.567 206.134H134.551C134.551 206.238 134.546 206.389 134.536 206.587C134.525 206.785 134.515 206.97 134.504 207.142C134.494 207.309 134.484 207.41 134.473 207.447H133.114C133.129 207.306 133.14 207.092 133.145 206.806C133.155 206.514 133.161 206.147 133.161 205.704V195.853H134.567V199.158C134.567 199.324 134.564 199.509 134.559 199.712C134.554 199.91 134.546 200.124 134.536 200.353H134.567C134.827 199.811 135.171 199.423 135.598 199.189C136.03 198.954 136.564 198.837 137.2 198.837C138.267 198.837 139.051 199.197 139.551 199.915C140.056 200.634 140.309 201.723 140.309 203.181ZM138.833 203.228C138.833 202.046 138.676 201.199 138.364 200.689C138.051 200.178 137.543 199.923 136.84 199.923C136.049 199.923 135.471 200.194 135.106 200.736C134.747 201.277 134.567 202.137 134.567 203.314C134.567 204.423 134.744 205.243 135.098 205.775C135.452 206.301 136.028 206.564 136.825 206.564C137.533 206.564 138.043 206.303 138.356 205.783C138.674 205.256 138.833 204.405 138.833 203.228ZM143.145 203.517C143.145 204.486 143.346 205.233 143.747 205.759C144.148 206.285 144.734 206.548 145.504 206.548C146.114 206.548 146.601 206.426 146.965 206.181C147.335 205.936 147.585 205.626 147.715 205.251L148.95 205.603C148.444 206.936 147.296 207.603 145.504 207.603C144.254 207.603 143.301 207.23 142.645 206.486C141.994 205.741 141.668 204.634 141.668 203.165C141.668 201.77 141.994 200.699 142.645 199.954C143.301 199.21 144.236 198.837 145.45 198.837C146.694 198.837 147.627 199.212 148.247 199.962C148.866 200.712 149.176 201.835 149.176 203.329V203.517H143.145ZM147.723 202.439C147.645 201.548 147.418 200.9 147.043 200.493C146.668 200.082 146.129 199.876 145.426 199.876C144.744 199.876 144.202 200.105 143.801 200.564C143.405 201.017 143.192 201.642 143.161 202.439H147.723ZM152.411 203.04V207.447H151.004V200.962C151.004 200.665 150.999 200.353 150.989 200.025C150.984 199.697 150.973 199.353 150.958 198.993H152.286C152.296 199.233 152.304 199.449 152.309 199.642C152.319 199.835 152.327 200.004 152.333 200.15C152.338 200.29 152.34 200.41 152.34 200.509C152.346 200.603 152.348 200.673 152.348 200.72H152.379C152.536 200.21 152.708 199.814 152.895 199.533C153.077 199.272 153.286 199.092 153.52 198.993C153.754 198.889 154.043 198.837 154.387 198.837C154.58 198.837 154.77 198.863 154.958 198.915V200.204C154.78 200.152 154.53 200.126 154.208 200.126C153.624 200.126 153.179 200.379 152.872 200.884C152.564 201.384 152.411 202.103 152.411 203.04Z" fill="#4A5565" />
                                        <path d="M245.219 203.06L244.289 203.622L243.117 201.607L241.898 203.607L240.969 203.044L242.445 201.107L240.258 200.536L240.609 199.49L242.695 200.326L242.602 198.005H243.664L243.562 200.31L245.625 199.505L245.977 200.536L243.773 201.107L245.219 203.06ZM251.453 203.06L250.523 203.622L249.352 201.607L248.133 203.607L247.203 203.044L248.68 201.107L246.492 200.536L246.844 199.49L248.93 200.326L248.836 198.005H249.898L249.797 200.31L251.859 199.505L252.211 200.536L250.008 201.107L251.453 203.06ZM257.688 203.06L256.758 203.622L255.586 201.607L254.367 203.607L253.438 203.044L254.914 201.107L252.727 200.536L253.078 199.49L255.164 200.326L255.07 198.005H256.133L256.031 200.31L258.094 199.505L258.445 200.536L256.242 201.107L257.688 203.06ZM263.922 203.06L262.992 203.622L261.82 201.607L260.602 203.607L259.672 203.044L261.148 201.107L258.961 200.536L259.312 199.49L261.398 200.326L261.305 198.005H262.367L262.266 200.31L264.328 199.505L264.68 200.536L262.477 201.107L263.922 203.06ZM271.82 206.521V209.013H270.492V206.521H265.305V205.427L270.344 198.005H271.82V205.411H273.367V206.521H271.82ZM266.602 205.411H270.492V201.021C270.492 200.781 270.492 200.544 270.492 200.31C270.497 200.07 270.508 199.831 270.523 199.591C270.404 199.82 270.299 200.008 270.211 200.154C270.122 200.294 270.042 200.417 269.969 200.521L266.602 205.411ZM281.938 199.146C281.375 200.005 280.893 200.771 280.492 201.443C280.096 202.115 279.784 202.695 279.555 203.185C279.091 204.159 278.742 205.12 278.508 206.068C278.279 207.016 278.164 207.997 278.164 209.013H276.695C276.695 208.284 276.771 207.544 276.922 206.794C277.073 206.039 277.315 205.247 277.648 204.419C277.961 203.643 278.357 202.826 278.836 201.966C279.32 201.102 279.901 200.18 280.578 199.201H274.664V198.005H281.938V199.146ZM290.844 207.818V209.013H283.555V208.021C283.82 207.411 284.141 206.872 284.516 206.404C284.896 205.935 285.299 205.513 285.727 205.138C286.154 204.763 286.576 204.414 286.992 204.091C287.201 203.93 287.396 203.768 287.578 203.607C287.766 203.445 287.943 203.284 288.109 203.122C288.443 202.799 288.711 202.461 288.914 202.107C289.122 201.753 289.227 201.352 289.227 200.904C289.227 200.299 289.049 199.831 288.695 199.497C288.341 199.164 287.849 198.997 287.219 198.997C286.62 198.997 286.125 199.161 285.734 199.49C285.349 199.812 285.122 200.268 285.055 200.857L283.617 200.724C283.721 199.844 284.094 199.143 284.734 198.622C285.38 198.102 286.208 197.841 287.219 197.841C288.328 197.841 289.18 198.104 289.773 198.63C290.372 199.151 290.672 199.893 290.672 200.857C290.672 201.284 290.573 201.708 290.375 202.13C290.182 202.552 289.893 202.974 289.508 203.396C289.315 203.604 289.034 203.872 288.664 204.201C288.294 204.529 287.839 204.914 287.297 205.357C286.698 205.846 286.221 206.289 285.867 206.685C285.513 207.076 285.258 207.453 285.102 207.818H290.844ZM299.797 203.286C299.797 205.177 299.451 206.63 298.758 207.646C298.07 208.661 297.089 209.169 295.812 209.169C294.953 209.169 294.263 208.99 293.742 208.63C293.227 208.266 292.857 207.68 292.633 206.872L293.977 206.661C294.258 207.578 294.878 208.036 295.836 208.036C296.643 208.036 297.268 207.661 297.711 206.911C298.154 206.161 298.385 205.091 298.406 203.701C298.198 204.169 297.841 204.547 297.336 204.833C296.831 205.115 296.276 205.255 295.672 205.255C295.016 205.255 294.443 205.102 293.953 204.794C293.464 204.487 293.083 204.055 292.812 203.497C292.542 202.94 292.406 202.289 292.406 201.544C292.406 200.393 292.729 199.49 293.375 198.833C294.021 198.172 294.919 197.841 296.07 197.841C297.294 197.841 298.221 198.294 298.852 199.201C299.482 200.107 299.797 201.469 299.797 203.286ZM298.266 201.927C298.266 201.042 298.062 200.331 297.656 199.794C297.25 199.253 296.706 198.982 296.023 198.982C295.346 198.982 294.812 199.214 294.422 199.677C294.031 200.135 293.836 200.758 293.836 201.544C293.836 202.346 294.031 202.982 294.422 203.451C294.812 203.914 295.341 204.146 296.008 204.146C296.414 204.146 296.786 204.052 297.125 203.865C297.469 203.677 297.745 203.417 297.953 203.083C298.161 202.745 298.266 202.359 298.266 201.927Z" fill="#101828" />
                                        <path d="M38.8325 244.214L37.5669 247.432H36.02L40.5122 236.425H42.2075L46.6294 247.432H45.106L43.8481 244.214H38.8325ZM41.3403 237.55C41.2518 237.841 41.145 238.167 41.02 238.526C40.9002 238.88 40.7882 239.193 40.6841 239.464L39.2856 243.05H43.4028L41.9888 239.417C41.9159 239.235 41.8195 238.977 41.6997 238.643C41.5799 238.31 41.4601 237.945 41.3403 237.55ZM50.981 247.589C49.7987 247.589 48.895 247.216 48.27 246.471C47.6502 245.721 47.3403 244.63 47.3403 243.198C47.3403 241.776 47.6528 240.693 48.2778 239.948C48.9028 239.198 49.7987 238.823 50.9653 238.823C51.8299 238.823 52.5461 239.047 53.1138 239.495C53.6867 239.943 54.0461 240.56 54.1919 241.346L52.7466 241.456C52.6737 240.987 52.4888 240.615 52.1919 240.339C51.895 240.063 51.4731 239.925 50.9263 239.925C50.1815 239.925 49.6424 240.172 49.3091 240.667C48.9757 241.162 48.8091 241.995 48.8091 243.167C48.8091 244.292 48.9862 245.125 49.3403 245.667C49.6945 246.208 50.2284 246.479 50.9419 246.479C51.4419 246.479 51.8586 246.344 52.1919 246.073C52.5304 245.802 52.7388 245.386 52.8169 244.823L54.2388 244.917C54.1659 245.458 53.9836 245.93 53.6919 246.331C53.4054 246.732 53.0304 247.042 52.5669 247.261C52.1086 247.479 51.5799 247.589 50.981 247.589ZM58.981 247.589C57.7987 247.589 56.895 247.216 56.27 246.471C55.6502 245.721 55.3403 244.63 55.3403 243.198C55.3403 241.776 55.6528 240.693 56.2778 239.948C56.9028 239.198 57.7987 238.823 58.9653 238.823C59.8299 238.823 60.5461 239.047 61.1138 239.495C61.6867 239.943 62.0461 240.56 62.1919 241.346L60.7466 241.456C60.6737 240.987 60.4888 240.615 60.1919 240.339C59.895 240.063 59.4731 239.925 58.9263 239.925C58.1815 239.925 57.6424 240.172 57.3091 240.667C56.9757 241.162 56.8091 241.995 56.8091 243.167C56.8091 244.292 56.9862 245.125 57.3403 245.667C57.6945 246.208 58.2284 246.479 58.9419 246.479C59.4419 246.479 59.8586 246.344 60.1919 246.073C60.5304 245.802 60.7388 245.386 60.8169 244.823L62.2388 244.917C62.1659 245.458 61.9836 245.93 61.6919 246.331C61.4054 246.732 61.0304 247.042 60.5669 247.261C60.1086 247.479 59.5799 247.589 58.981 247.589ZM70.8872 243.198C70.8872 244.677 70.5617 245.779 69.9106 246.503C69.2596 247.227 68.3143 247.589 67.0747 247.589C65.8403 247.589 64.908 247.214 64.2778 246.464C63.6476 245.708 63.3325 244.62 63.3325 243.198C63.3325 241.74 63.6476 240.646 64.2778 239.917C64.9132 239.188 65.8612 238.823 67.1216 238.823C68.4132 238.823 69.3638 239.18 69.9731 239.893C70.5825 240.602 70.8872 241.703 70.8872 243.198ZM69.4106 243.198C69.4106 242.031 69.2362 241.185 68.8872 240.659C68.5435 240.128 67.9627 239.862 67.145 239.862C66.3221 239.862 65.7257 240.133 65.356 240.675C64.9914 241.211 64.8091 242.052 64.8091 243.198C64.8091 244.313 64.9888 245.151 65.3481 245.714C65.7127 246.271 66.283 246.55 67.0591 246.55C67.9028 246.55 68.5044 246.279 68.8638 245.737C69.2284 245.195 69.4106 244.349 69.4106 243.198ZM77.9888 245.987C77.6659 246.57 77.2909 246.985 76.8638 247.229C76.4419 247.469 75.9159 247.589 75.2856 247.589C74.3586 247.589 73.6789 247.36 73.2466 246.901C72.8195 246.438 72.606 245.675 72.606 244.612V238.979H74.02V244.339C74.02 245.182 74.1502 245.755 74.4106 246.057C74.6763 246.354 75.1268 246.503 75.7622 246.503C76.4393 246.503 76.9731 246.271 77.3638 245.807C77.7544 245.344 77.9497 244.701 77.9497 243.878V238.979H79.356V245.628C79.356 246.117 79.3586 246.513 79.3638 246.815C79.3742 247.117 79.3872 247.323 79.4028 247.432H78.0747C78.0695 247.406 78.0591 247.284 78.0435 247.065C78.033 246.846 78.0226 246.487 78.0122 245.987H77.9888ZM82.9888 242.534V247.432H81.5825V240.784C81.5825 240.289 81.5773 239.893 81.5669 239.596C81.5617 239.294 81.5513 239.089 81.5356 238.979H82.8638C82.8742 239.078 82.882 239.203 82.8872 239.354C82.8976 239.505 82.9054 239.672 82.9106 239.854C82.9159 240.037 82.9211 240.227 82.9263 240.425H82.9497C83.2726 239.841 83.645 239.43 84.0669 239.19C84.494 238.945 85.0226 238.823 85.6528 238.823C86.5799 238.823 87.257 239.06 87.6841 239.534C88.1164 240.008 88.3325 240.763 88.3325 241.8V247.432H86.9185V242.073C86.9185 241.266 86.7882 240.703 86.5278 240.386C86.2674 240.068 85.8169 239.909 85.1763 239.909C84.4992 239.909 83.9653 240.141 83.5747 240.604C83.1841 241.068 82.9888 241.711 82.9888 242.534ZM93.7075 247.37C93.2492 247.495 92.7752 247.557 92.2856 247.557C91.7231 247.557 91.3013 247.399 91.02 247.081C90.7388 246.758 90.5981 246.279 90.5981 245.643V240.003H89.6216V238.979H90.6528L91.0669 237.089H92.0044V238.979H93.5669V240.003H92.0044V245.339C92.0044 245.745 92.0695 246.031 92.1997 246.198C92.3351 246.36 92.5669 246.44 92.895 246.44C93.0721 246.44 93.3429 246.404 93.7075 246.331V247.37ZM103.614 237.643V247.432H102.129V237.643H98.3481V236.425H107.395V237.643H103.614ZM108.372 250.753C107.997 250.753 107.674 250.724 107.403 250.667V249.612C107.601 249.643 107.819 249.659 108.059 249.659C108.497 249.659 108.9 249.495 109.27 249.167C109.645 248.844 109.978 248.253 110.27 247.393L106.918 238.979H108.418L110.2 243.651C110.33 243.985 110.468 244.362 110.614 244.784C110.765 245.206 110.882 245.578 110.965 245.901C111.096 245.531 111.226 245.164 111.356 244.8C111.491 244.435 111.622 244.07 111.747 243.706L113.364 238.979H114.848L111.598 247.432C111.421 247.88 111.252 248.271 111.09 248.604C110.929 248.943 110.773 249.221 110.622 249.44C110.319 249.883 109.984 250.211 109.614 250.425C109.249 250.643 108.835 250.753 108.372 250.753ZM123.106 243.167C123.106 244.641 122.846 245.748 122.325 246.487C121.809 247.221 121.033 247.589 119.997 247.589C118.694 247.589 117.819 247.099 117.372 246.12H117.333C117.353 246.156 117.364 246.599 117.364 247.448V250.753H115.958V240.706C115.958 240.274 115.952 239.914 115.942 239.628C115.937 239.336 115.926 239.12 115.911 238.979H117.27C117.275 239 117.283 239.102 117.293 239.284C117.309 239.466 117.322 239.664 117.333 239.878C117.343 240.086 117.348 240.24 117.348 240.339H117.379C117.629 239.818 117.96 239.438 118.372 239.198C118.783 238.953 119.325 238.831 119.997 238.831C121.038 238.831 121.817 239.18 122.333 239.878C122.848 240.576 123.106 241.672 123.106 243.167ZM121.629 243.198C121.629 242.021 121.471 241.18 121.153 240.675C120.835 240.169 120.33 239.917 119.637 239.917C118.866 239.917 118.293 240.185 117.918 240.721C117.549 241.253 117.364 242.115 117.364 243.307C117.364 244.417 117.541 245.235 117.895 245.761C118.249 246.287 118.825 246.55 119.622 246.55C120.319 246.55 120.827 246.294 121.145 245.784C121.468 245.268 121.629 244.406 121.629 243.198ZM125.942 243.503C125.942 244.471 126.142 245.219 126.543 245.745C126.944 246.271 127.53 246.534 128.301 246.534C128.911 246.534 129.398 246.412 129.762 246.167C130.132 245.922 130.382 245.612 130.512 245.237L131.747 245.589C131.241 246.922 130.093 247.589 128.301 247.589C127.051 247.589 126.098 247.216 125.442 246.471C124.791 245.727 124.465 244.62 124.465 243.151C124.465 241.755 124.791 240.685 125.442 239.94C126.098 239.195 127.033 238.823 128.247 238.823C129.491 238.823 130.424 239.198 131.043 239.948C131.663 240.698 131.973 241.82 131.973 243.315V243.503H125.942ZM130.52 242.425C130.442 241.534 130.215 240.886 129.84 240.479C129.465 240.068 128.926 239.862 128.223 239.862C127.541 239.862 126.999 240.091 126.598 240.55C126.202 241.003 125.989 241.628 125.958 242.425H130.52Z" fill="#4A5565" />
                                        <path d="M240.25 247.943C241.792 247.943 242.951 247.18 243.727 245.654L244.945 246.263C244.492 247.211 243.854 247.932 243.031 248.427C242.214 248.922 241.263 249.169 240.18 249.169C239.065 249.169 238.107 248.937 237.305 248.474C236.503 248.01 235.885 247.352 235.453 246.497C235.026 245.638 234.812 244.625 234.812 243.458C234.812 242.286 235.026 241.281 235.453 240.443C235.88 239.604 236.495 238.961 237.297 238.513C238.099 238.065 239.057 237.841 240.172 237.841C241.344 237.841 242.323 238.07 243.109 238.529C243.896 238.987 244.474 239.667 244.844 240.568L243.43 241.036C243.174 240.396 242.763 239.906 242.195 239.568C241.633 239.229 240.964 239.06 240.188 239.06C238.969 239.06 238.021 239.453 237.344 240.24C236.667 241.021 236.328 242.094 236.328 243.458C236.328 244.354 236.487 245.141 236.805 245.818C237.128 246.49 237.581 247.013 238.164 247.388C238.753 247.758 239.448 247.943 240.25 247.943ZM248.039 242.005C248.341 241.453 248.703 241.049 249.125 240.794C249.552 240.534 250.091 240.404 250.742 240.404C251.659 240.404 252.333 240.643 252.766 241.122C253.203 241.596 253.422 242.349 253.422 243.38V249.013H252.008V243.654C252.008 242.888 251.872 242.336 251.602 241.997C251.336 241.659 250.891 241.49 250.266 241.49C249.604 241.49 249.073 241.719 248.672 242.177C248.276 242.635 248.078 243.253 248.078 244.029V249.013H246.672V237.419H248.078V240.435C248.078 240.643 248.073 240.865 248.062 241.099C248.052 241.328 248.042 241.529 248.031 241.701C248.026 241.867 248.021 241.969 248.016 242.005H248.039ZM256.625 245.083C256.625 246.052 256.826 246.799 257.227 247.326C257.628 247.852 258.214 248.115 258.984 248.115C259.594 248.115 260.081 247.992 260.445 247.747C260.815 247.503 261.065 247.193 261.195 246.818L262.43 247.169C261.924 248.503 260.776 249.169 258.984 249.169C257.734 249.169 256.781 248.797 256.125 248.052C255.474 247.307 255.148 246.201 255.148 244.732C255.148 243.336 255.474 242.266 256.125 241.521C256.781 240.776 257.716 240.404 258.93 240.404C260.174 240.404 261.107 240.779 261.727 241.529C262.346 242.279 262.656 243.401 262.656 244.896V245.083H256.625ZM261.203 244.005C261.125 243.115 260.898 242.466 260.523 242.06C260.148 241.648 259.609 241.443 258.906 241.443C258.224 241.443 257.682 241.672 257.281 242.13C256.885 242.583 256.672 243.208 256.641 244.005H261.203ZM267.695 249.169C266.513 249.169 265.609 248.797 264.984 248.052C264.365 247.302 264.055 246.211 264.055 244.779C264.055 243.357 264.367 242.273 264.992 241.529C265.617 240.779 266.513 240.404 267.68 240.404C268.544 240.404 269.26 240.628 269.828 241.076C270.401 241.523 270.76 242.141 270.906 242.927L269.461 243.036C269.388 242.568 269.203 242.195 268.906 241.919C268.609 241.643 268.188 241.505 267.641 241.505C266.896 241.505 266.357 241.753 266.023 242.247C265.69 242.742 265.523 243.576 265.523 244.747C265.523 245.872 265.701 246.706 266.055 247.247C266.409 247.789 266.943 248.06 267.656 248.06C268.156 248.06 268.573 247.924 268.906 247.654C269.245 247.383 269.453 246.966 269.531 246.404L270.953 246.497C270.88 247.039 270.698 247.51 270.406 247.911C270.12 248.312 269.745 248.622 269.281 248.841C268.823 249.06 268.294 249.169 267.695 249.169ZM273.859 246.005V249.013H272.453V237.419H273.859V244.661L277.57 240.56H279.219L275.789 244.193L279.398 249.013H277.75L274.891 245.154L273.859 246.005ZM281.852 237.419V238.763H280.445V237.419H281.852ZM281.852 240.56V249.013H280.445V240.56H281.852ZM285.453 244.115V249.013H284.047V242.365C284.047 241.87 284.042 241.474 284.031 241.177C284.026 240.875 284.016 240.669 284 240.56H285.328C285.339 240.659 285.346 240.784 285.352 240.935C285.362 241.086 285.37 241.253 285.375 241.435C285.38 241.617 285.385 241.807 285.391 242.005H285.414C285.737 241.422 286.109 241.01 286.531 240.771C286.958 240.526 287.487 240.404 288.117 240.404C289.044 240.404 289.721 240.641 290.148 241.115C290.581 241.589 290.797 242.344 290.797 243.38V249.013H289.383V243.654C289.383 242.846 289.253 242.284 288.992 241.966C288.732 241.648 288.281 241.49 287.641 241.49C286.964 241.49 286.43 241.721 286.039 242.185C285.648 242.648 285.453 243.292 285.453 244.115ZM296.125 252.333C295.203 252.333 294.469 252.151 293.922 251.786C293.375 251.427 293.023 250.914 292.867 250.247L294.281 250.044C294.375 250.435 294.581 250.734 294.898 250.943C295.221 251.156 295.643 251.263 296.164 251.263C296.862 251.263 297.385 251.057 297.734 250.646C298.089 250.234 298.266 249.62 298.266 248.802V247.443H298.25C297.984 247.984 297.62 248.393 297.156 248.669C296.693 248.94 296.151 249.076 295.531 249.076C294.495 249.076 293.732 248.732 293.242 248.044C292.758 247.357 292.516 246.276 292.516 244.802C292.516 243.307 292.776 242.206 293.297 241.497C293.823 240.784 294.62 240.427 295.688 240.427C296.286 240.427 296.805 240.565 297.242 240.841C297.685 241.112 298.026 241.5 298.266 242.005H298.281C298.281 241.901 298.286 241.74 298.297 241.521C298.307 241.297 298.32 241.086 298.336 240.888C298.352 240.69 298.365 240.581 298.375 240.56H299.711C299.68 240.841 299.664 241.424 299.664 242.31V248.771C299.664 249.958 299.37 250.849 298.781 251.443C298.193 252.036 297.307 252.333 296.125 252.333ZM298.266 244.786C298.266 243.76 298.055 242.953 297.633 242.365C297.216 241.771 296.682 241.474 296.031 241.474C295.312 241.474 294.789 241.734 294.461 242.255C294.133 242.776 293.969 243.62 293.969 244.786C293.969 245.943 294.122 246.773 294.43 247.279C294.737 247.784 295.263 248.036 296.008 248.036C296.674 248.036 297.216 247.747 297.633 247.169C298.055 246.586 298.266 245.792 298.266 244.786Z" fill="#101828" />
                                        <path d="M45.9263 284.379C45.9263 285.395 45.5278 286.182 44.731 286.739C43.9393 287.296 42.8221 287.575 41.3794 287.575C38.6971 287.575 37.1424 286.642 36.7153 284.778L38.1606 284.489C38.3273 285.15 38.6815 285.637 39.2231 285.95C39.7648 286.257 40.5018 286.411 41.4341 286.411C42.3976 286.411 43.1398 286.247 43.6606 285.919C44.1867 285.585 44.4497 285.098 44.4497 284.458C44.4497 284.098 44.3664 283.807 44.1997 283.583C44.0382 283.359 43.8091 283.174 43.5122 283.028C43.2153 282.882 42.8612 282.76 42.4497 282.661C42.0382 282.562 41.5825 282.455 41.0825 282.34C40.5044 282.21 40.02 282.083 39.6294 281.958C39.244 281.833 38.9263 281.702 38.6763 281.567C38.4263 281.426 38.2127 281.278 38.0356 281.122C37.7752 280.882 37.5747 280.603 37.4341 280.286C37.2987 279.968 37.231 279.603 37.231 279.192C37.231 278.249 37.5903 277.523 38.3091 277.012C39.033 276.502 40.0669 276.247 41.4106 276.247C42.6606 276.247 43.6164 276.439 44.2778 276.825C44.9393 277.205 45.4028 277.856 45.6685 278.778L44.1997 279.036C44.0382 278.452 43.731 278.03 43.2778 277.77C42.8247 277.504 42.1971 277.372 41.395 277.372C40.5148 277.372 39.8429 277.517 39.3794 277.809C38.9159 278.101 38.6841 278.536 38.6841 279.114C38.6841 279.452 38.7726 279.734 38.9497 279.958C39.132 280.176 39.3924 280.361 39.731 280.512C40.0487 280.663 40.7231 280.853 41.7544 281.083C42.1763 281.182 42.5929 281.286 43.0044 281.395C43.4159 281.499 43.8039 281.632 44.1685 281.794C44.382 281.882 44.5851 281.991 44.7778 282.122C44.9757 282.247 45.1476 282.392 45.2935 282.559C45.4914 282.778 45.645 283.036 45.7544 283.333C45.869 283.629 45.9263 283.978 45.9263 284.379ZM50.9888 287.356C50.5304 287.481 50.0565 287.544 49.5669 287.544C49.0044 287.544 48.5825 287.385 48.3013 287.067C48.02 286.744 47.8794 286.265 47.8794 285.629V279.989H46.9028V278.965H47.9341L48.3481 277.075H49.2856V278.965H50.8481V279.989H49.2856V285.325C49.2856 285.731 49.3507 286.017 49.481 286.184C49.6164 286.346 49.8481 286.426 50.1763 286.426C50.3534 286.426 50.6242 286.39 50.9888 286.317V287.356ZM54.3481 287.575C53.4992 287.575 52.8612 287.351 52.4341 286.903C52.007 286.455 51.7935 285.84 51.7935 285.059C51.7935 284.184 52.0799 283.512 52.6528 283.044C53.231 282.575 54.1606 282.325 55.4419 282.294L57.3403 282.262V281.801C57.3403 281.114 57.1945 280.622 56.9028 280.325C56.6112 280.028 56.1528 279.879 55.5278 279.879C54.8976 279.879 54.4393 279.986 54.1528 280.2C53.8664 280.413 53.6945 280.754 53.6372 281.223L52.1685 281.09C52.408 279.57 53.5382 278.809 55.5591 278.809C56.6216 278.809 57.4211 279.054 57.9575 279.544C58.494 280.028 58.7622 280.731 58.7622 281.653V285.294C58.7622 285.71 58.8169 286.025 58.9263 286.239C59.0356 286.447 59.244 286.551 59.5513 286.551C59.6971 286.551 59.8507 286.533 60.0122 286.497V287.372C59.8351 287.413 59.6554 287.445 59.4731 287.465C59.2909 287.486 59.1086 287.497 58.9263 287.497C58.4054 287.497 58.0252 287.361 57.7856 287.09C57.5513 286.814 57.4185 286.385 57.3872 285.801H57.3403C56.981 286.447 56.5617 286.905 56.0825 287.176C55.6086 287.442 55.0304 287.575 54.3481 287.575ZM57.3403 283.247L55.8013 283.278C55.145 283.283 54.645 283.351 54.3013 283.481C53.9575 283.606 53.6945 283.799 53.5122 284.059C53.3299 284.32 53.2388 284.661 53.2388 285.083C53.2388 285.541 53.3612 285.895 53.606 286.145C53.856 286.395 54.2101 286.52 54.6685 286.52C55.1893 286.52 55.6476 286.403 56.0435 286.169C56.4445 285.934 56.7596 285.614 56.9888 285.208C57.2231 284.796 57.3403 284.374 57.3403 283.942V283.247ZM64.3481 287.356C63.8898 287.481 63.4159 287.544 62.9263 287.544C62.3638 287.544 61.9419 287.385 61.6606 287.067C61.3794 286.744 61.2388 286.265 61.2388 285.629V279.989H60.2622V278.965H61.2935L61.7075 277.075H62.645V278.965H64.2075V279.989H62.645V285.325C62.645 285.731 62.7101 286.017 62.8403 286.184C62.9757 286.346 63.2075 286.426 63.5356 286.426C63.7127 286.426 63.9836 286.39 64.3481 286.317V287.356ZM70.895 285.973C70.5721 286.557 70.1971 286.971 69.77 287.215C69.3481 287.455 68.8221 287.575 68.1919 287.575C67.2648 287.575 66.5851 287.346 66.1528 286.887C65.7257 286.424 65.5122 285.661 65.5122 284.598V278.965H66.9263V284.325C66.9263 285.169 67.0565 285.741 67.3169 286.044C67.5825 286.34 68.033 286.489 68.6685 286.489C69.3455 286.489 69.8794 286.257 70.27 285.794C70.6606 285.33 70.856 284.687 70.856 283.864V278.965H72.2622V285.614C72.2622 286.103 72.2648 286.499 72.27 286.801C72.2804 287.103 72.2935 287.309 72.3091 287.419H70.981C70.9757 287.392 70.9653 287.27 70.9497 287.051C70.9393 286.833 70.9289 286.473 70.9185 285.973H70.895ZM80.8013 285.083C80.8013 285.879 80.4992 286.494 79.895 286.926C79.2961 287.359 78.4549 287.575 77.3716 287.575C76.3195 287.575 75.507 287.403 74.9341 287.059C74.3664 286.71 73.9966 286.169 73.8247 285.434L75.0669 285.192C75.1867 285.645 75.4341 285.978 75.8091 286.192C76.1841 286.4 76.7049 286.504 77.3716 286.504C78.0851 286.504 78.606 286.395 78.9341 286.176C79.2674 285.958 79.4341 285.629 79.4341 285.192C79.4341 284.859 79.3195 284.588 79.0903 284.379C78.8612 284.171 78.4914 283.999 77.981 283.864C77.3768 283.702 76.895 283.57 76.5356 283.465C76.1815 283.361 75.908 283.273 75.7153 283.2C75.5226 283.122 75.369 283.049 75.2544 282.981C74.9106 282.783 74.6424 282.541 74.4497 282.254C74.257 281.968 74.1606 281.616 74.1606 281.2C74.1606 280.429 74.4341 279.843 74.981 279.442C75.533 279.036 76.3351 278.833 77.3872 278.833C78.3195 278.833 79.0591 278.997 79.606 279.325C80.158 279.653 80.507 280.179 80.6528 280.903L79.3872 281.059C79.3091 280.684 79.0981 280.398 78.7544 280.2C78.4159 279.997 77.9601 279.895 77.3872 279.895C76.7518 279.895 76.283 279.991 75.981 280.184C75.6789 280.377 75.5278 280.669 75.5278 281.059C75.5278 281.346 75.6138 281.583 75.7856 281.77C75.9575 281.952 76.2856 282.103 76.77 282.223C77.4211 282.379 78.0409 282.551 78.6294 282.739C79.2179 282.921 79.6398 283.103 79.895 283.286C80.1919 283.499 80.4159 283.752 80.5669 284.044C80.7231 284.33 80.8013 284.676 80.8013 285.083Z" fill="#4A5565" />
                                        <path d="M259.844 285.794L258.578 289.013H257.031L261.523 278.005H263.219L267.641 289.013H266.117L264.859 285.794H259.844ZM262.352 279.13C262.263 279.422 262.156 279.747 262.031 280.107C261.911 280.461 261.799 280.773 261.695 281.044L260.297 284.63H264.414L263 280.997C262.927 280.815 262.831 280.557 262.711 280.224C262.591 279.891 262.471 279.526 262.352 279.13ZM271.992 289.169C270.81 289.169 269.906 288.797 269.281 288.052C268.661 287.302 268.352 286.211 268.352 284.779C268.352 283.357 268.664 282.273 269.289 281.529C269.914 280.779 270.81 280.404 271.977 280.404C272.841 280.404 273.557 280.628 274.125 281.076C274.698 281.523 275.057 282.141 275.203 282.927L273.758 283.036C273.685 282.568 273.5 282.195 273.203 281.919C272.906 281.643 272.484 281.505 271.938 281.505C271.193 281.505 270.654 281.753 270.32 282.247C269.987 282.742 269.82 283.576 269.82 284.747C269.82 285.872 269.997 286.706 270.352 287.247C270.706 287.789 271.24 288.06 271.953 288.06C272.453 288.06 272.87 287.924 273.203 287.654C273.542 287.383 273.75 286.966 273.828 286.404L275.25 286.497C275.177 287.039 274.995 287.51 274.703 287.911C274.417 288.312 274.042 288.622 273.578 288.841C273.12 289.06 272.591 289.169 271.992 289.169ZM280 288.951C279.542 289.076 279.068 289.138 278.578 289.138C278.016 289.138 277.594 288.979 277.312 288.661C277.031 288.339 276.891 287.859 276.891 287.224V281.583H275.914V280.56H276.945L277.359 278.669H278.297V280.56H279.859V281.583H278.297V286.919C278.297 287.326 278.362 287.612 278.492 287.779C278.628 287.94 278.859 288.021 279.188 288.021C279.365 288.021 279.635 287.984 280 287.911V288.951ZM282.602 277.419V278.763H281.195V277.419H282.602ZM282.602 280.56V289.013H281.195V280.56H282.602ZM291.633 280.56L288.477 289.013H286.812L283.742 280.56H285.242L287.102 286.06C287.138 286.164 287.201 286.372 287.289 286.685C287.378 286.992 287.495 287.401 287.641 287.911C287.708 287.708 287.773 287.497 287.836 287.279C287.904 287.055 287.969 286.839 288.031 286.63C288.099 286.422 288.161 286.237 288.219 286.076L290.141 280.56H291.633ZM293.844 285.083C293.844 286.052 294.044 286.799 294.445 287.326C294.846 287.852 295.432 288.115 296.203 288.115C296.812 288.115 297.299 287.992 297.664 287.747C298.034 287.503 298.284 287.193 298.414 286.818L299.648 287.169C299.143 288.503 297.995 289.169 296.203 289.169C294.953 289.169 294 288.797 293.344 288.052C292.693 287.307 292.367 286.201 292.367 284.732C292.367 283.336 292.693 282.266 293.344 281.521C294 280.776 294.935 280.404 296.148 280.404C297.393 280.404 298.326 280.779 298.945 281.529C299.565 282.279 299.875 283.401 299.875 284.896V285.083H293.844ZM298.422 284.005C298.344 283.115 298.117 282.466 297.742 282.06C297.367 281.648 296.828 281.443 296.125 281.443C295.443 281.443 294.901 281.672 294.5 282.13C294.104 282.583 293.891 283.208 293.859 284.005H298.422Z" fill="#00A63E" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_dd_278_1308" x="0" y="0" width="369.022" height="340.722" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_278_1308" />
                                            <feOffset dy="4" />
                                            <feGaussianBlur stdDeviation="3" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_278_1308" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_278_1308" />
                                            <feOffset dy="10" />
                                            <feGaussianBlur stdDeviation="7.5" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                            <feBlend mode="normal" in2="effect1_dropShadow_278_1308" result="effect2_dropShadow_278_1308" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_278_1308" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                );

            // ===== 4 JSON-driven message apps =====
            case APPS.MESSAGES:
            case APPS.MAIL:
            case APPS.WECHAT:
            case APPS.TINDER: {
                // Limit all four apps via this round's random selection
                const data = limitedSelected[activeApp] || [];

                return (
                    <div style={{ backgroundColor: "white", height: "100%" }}>
                        {renderHeader()}
                        <div className={styles.listScreen}>
                            {data.map((msg) => (
                                <MessageRow
                                    key={msg.id}
                                    message={msg}
                                    onLongPress={(m) => handleLongPressMessage(m, activeApp)}
                                />
                            ))}

                        </div>
                    </div>
                );
            }

            // ===== Google =====
            case APPS.SEARCH:
                return (
                    <>
                        {renderHeader()}
                        <div className={styles.searchScreen} style={{ width: '100%', height: '100%', padding: 0 }}>
                            <iframe
                                title="Google"
                                src="https://www.google.com/?igu=1"
                                style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            />
                        </div>
                    </>
                );

            default:
                return renderHome();
        }
    };

    // When parent requests SCAMS_FOUND as externalView, open it as a regular app
    useEffect(() => {
        if (externalView === 'SCAMS_FOUND') {
            setAppWithAnim(APPS.SCAMS_FOUND, 'Left');
            // Clear the externalView in parent if possible since we no longer use overlay
            if (onCloseExternalView) onCloseExternalView();
        }
    }, [externalView]);

    // Compute and publish ground-truth scams for this round to context once
    useEffect(() => {
        try {
            const apps = [APPS.MAIL, APPS.WECHAT, APPS.TINDER, APPS.MESSAGES, APPS.PHOTOS];
            const truth = [];
            for (const app of apps) {
                const items = (limitedSelected[app] || []);
                items.forEach((it) => {
                    if (it && it.isScam) {
                        truth.push({
                            id: it.id,
                            sourceApp: app,
                            title: it.title || (app === APPS.PHOTOS ? 'Photo' : ''),
                            shortSummary: it.shortSummary || '',
                            icon: it.icon || (app === APPS.PHOTOS ? '🖼️' : '⚠️'),
                            type: it.type || (app === APPS.PHOTOS ? 'Tech' : 'General')
                        });
                    }
                });
            }
            if (typeof setCorrectScams === 'function') setCorrectScams(truth);
        } catch { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Also animate when externalView switches (e.g., other overlays like FINISH)
    const prevExternalRef = useRef(externalView);
    useEffect(() => {
        if (prevExternalRef.current !== externalView) {
            const entering = !prevExternalRef.current && !!externalView;
            setTransitionDir(entering ? "Left" : "Right");
            setAnimTick((k) => k + 1);
            prevExternalRef.current = externalView;
        }
    }, [externalView]);

    // Main return
    return (
        <div className={styles.phoneWrapper}>
            <div className={styles.phoneInner}>
                <div key={animTick} className={`${styles.appContent} ${styles[`slideIn${transitionDir}`]}`}>
                    {renderAppContent()}
                </div>
            </div>

            {/* long press popup */}
            {isDialogOpen && selectedMessage && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalTitle}>Mark as Scam?</div>
                        <div className={styles.modalSummary}>
                            <strong>{selectedMessage.title}</strong>
                            <br />
                            {selectedMessage.shortSummary}
                        </div>

                        <div className={styles.modalButtons}>
                            <button
                                className={`${styles.modalBtn} ${styles.modalCancel}`}
                                onClick={handleCancelSave}
                            >
                                Cancel
                            </button>
                            <button
                                className={`${styles.modalBtn} ${styles.modalConfirm}`}
                                onClick={handleConfirmSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isPhotoOpen && selectedPhoto && (
                <div className={styles.modalOverlay} onClick={handleClosePhoto}>
                    <div
                        className={styles.photoModal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedPhoto.url}
                            alt=""
                            className={styles.photoModalImage}
                        />

                        {selectedPhoto.shortSummary && (
                            <div className={styles.photoCaption}>
                                {selectedPhoto.shortSummary}
                            </div>
                        )}

                        <button
                            className={styles.photoModalClose}
                            onClick={handleClosePhoto}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* remove confirmation popup */}
            {removeConfirmOpen && itemToRemove && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalTitle}>Delete flagged item?</div>
                        <div className={styles.modalSummary}>
                            <strong>{itemToRemove.title || itemToRemove.text || 'Untitled'}</strong>
                            <br />
                            {itemToRemove.shortSummary}
                        </div>

                        <div className={styles.modalButtons}>
                            <button
                                className={`${styles.modalBtn} ${styles.modalCancel}`}
                                onClick={handleConfirmRemove}
                            >
                                Delete
                            </button>
                            <button
                                className={`${styles.modalBtn} ${styles.modalConfirm}`}
                                onClick={handleCancelRemove}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

/* ---------- Home Icon Component---------- */
function HomeIcon({ label, badge, icon, type, onClick }) {
    return (
        <button className={`${styles.homeIcon} ${styles[type]}`} onClick={onClick}>
            {badge !== undefined && (
                <span className={styles.homeBadge}>{badge}</span>
            )}
            <div className={styles.homeInner}>{icon}</div>
            <div className={styles.homeLabel}>{label}</div>
        </button>
    );
}

/* ---------- Message Row Component---------- */
function MessageRow({ message, onLongPress }) {
    const [pressTimer, setPressTimer] = useState(null);

    const startPress = () => {
        if (pressTimer) return;
        const timerId = window.setTimeout(() => {
            onLongPress && onLongPress(message);
        }, LONG_PRESS_MS);
        setPressTimer(timerId);
    };

    const cancelPress = () => {
        if (pressTimer) {
            window.clearTimeout(pressTimer);
            setPressTimer(null);
        }
    };

    return (
        <div
            className={styles.msgRow}
            onMouseDown={startPress}
            onMouseUp={cancelPress}
            onMouseLeave={cancelPress}
            onTouchStart={startPress}
            onTouchEnd={cancelPress}
        >
            <div className={styles.msgIcon}>{message.icon}</div>
            <div className={styles.msgContent}>
                <div className={styles.msgTitle}>{message.title}</div>
                <div className={styles.msgText}>{message.text}</div>
            </div>
        </div>
    );
}
