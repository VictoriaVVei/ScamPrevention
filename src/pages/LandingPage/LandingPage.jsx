import React, { useEffect, useRef, useState } from 'react'; //import React Component
import styles from './LandingPage.module.css';
import { NavLink } from 'react-router-dom';
import Galaxy from '../../components/Galaxy/Galaxy';
import 'vic-ui-library/dist/ui-library.css'
import { FinalGallery } from 'vic-ui-library'
import { cloudStore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const input_area_fullScreenRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [visibleSections, setVisibleSections] = useState({
        intro2: false,
        intro3: false,
        intro4: false,
        intro5: false,
        icon2: false,
        icon3: false,
        icon4: false,
    });
    const [mockImgs, setMockImgs] = useState([
        "/img/Storyboard1.jpg",
        "/img/Storyboard2.jpeg",
        "/img/Storyboard3.jpg",
    ]);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const shouldBeScrolled = scrollTop > 50;

                    if (shouldBeScrolled !== isScrolled) {
                        setIsScrolled(shouldBeScrolled);
                    }

                    const checkVisibility = (elementClass, sectionKey) => {
                        const element = document.querySelector(`.${elementClass}`);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            const windowHeight = window.innerHeight;
                            return rect.top < windowHeight * 0.8;
                        }
                        return false;
                    };

                    const checkIconVisibility = (index) => {
                        const icons = document.querySelectorAll(`.${styles.icon}`);
                        if (icons[index]) {
                            const rect = icons[index].getBoundingClientRect();
                            const windowHeight = window.innerHeight;
                            return rect.top < windowHeight * 0.9;
                        }
                        return false;
                    };

                    const newVisibleSections = {
                        intro1: checkVisibility(styles.intro1, 'intro1'),
                        intro2: checkVisibility(styles.intro2, 'intro2'),
                        intro3: checkVisibility(styles.intro3, 'intro3'),
                        intro4: checkVisibility(styles.intro4, 'intro4'),
                        intro5: checkVisibility(styles.intro5, 'intro5'),
                        icon1: checkIconVisibility(0),
                        icon2: checkIconVisibility(1),
                        icon3: checkIconVisibility(2),
                        icon4: checkIconVisibility(3),
                        icon5: checkIconVisibility(4)
                    };

                    if (JSON.stringify(newVisibleSections) !== JSON.stringify(visibleSections)) {
                        setVisibleSections(newVisibleSections);
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled, visibleSections]);

    useEffect(() => {
        if (isOpen) {
            input_area_fullScreenRef.current.style.opacity = "1";
            input_area_fullScreenRef.current.style.pointerEvents = "auto";
        } else {
            input_area_fullScreenRef.current.style.opacity = "0";
            input_area_fullScreenRef.current.style.pointerEvents = "none";
        }
    }, [isOpen]);

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        setIsScrolled(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim()) {
            setSubmitMessage('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSubmitMessage('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const docRef = await addDoc(collection(cloudStore, 'subscribers'), {
                name: formData.name.trim(),
                email: formData.email.trim(),
                subscribeDate: new Date(),
                timestamp: Date.now()
            });

            console.log('Document written with ID: ', docRef.id);
            setSubmitMessage('Successfully subscribed! Thank you for joining us.');

            setFormData({ name: '', email: '' });

            setTimeout(() => {
                setIsOpen(false);
                setSubmitMessage('');
            }, 3000);

        } catch (error) {
            console.error('Error adding document: ', error);
            setSubmitMessage('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div id={styles.landing}>
            <div className={styles.Galaxy_container}>
                <Galaxy
                    mouseRepulsion={true}
                    mouseInteraction={true}
                    density={0.8}
                    glowIntensity={0.15}
                />
            </div>

            <div className={`${styles.logo} ${isScrolled ? styles.logo_scrolled : ''}`} onClick={topFunction}>
                <img src={"/img/logo.png"} alt='logo' />
            </div>

            <div className={`${styles.welcome_board} ${isScrolled ? styles.welcome_board_scrolled : ''}`}>
                <div className={`${styles.welcome_content} ${isScrolled ? styles.welcome_content_scrolled : ''}`}>
                    <div className={styles.word}>
                        <h1>Identify What’s Real</h1>
                        <h2 style={{ fontFamily: "Momo Signature" }}>Detect and Verify Online Content</h2>
                        <p>A shared space for learning and mutual protection.
                            We believe the best way to fight scams is by sharing verified stories,
                            real experiences, and clear guidelines — so no one has to face deception alone.</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <NavLink to="" onClick={topFunction} className={styles.button}>Explore</NavLink>
                        <div onClick={() => setIsOpen(true)} className={styles.button}>Follow</div>
                    </div>
                </div>
            </div>

            <main>
                <div>
                    <svg t="1761800988529" className={`${styles.icon} ${visibleSections.icon1 ? styles.visible : ''}`} style={{ opacity: "1" }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1666" width="50" height="50">
                        <path d="M762 512L512 912 262 512l250-400z" p-id="1667" fill="white"></path>
                    </svg>
                </div>
                <div className={`${styles.intro1} ${visibleSections.intro1 ? styles.visible : ''}`} >
                    <div className={styles.intro1_1}>
                        <div>
                            <h1 >Why does this problem matter?</h1>
                            <p>
                                Online scams are everywhere — from fake scholarship offers to online marketplace traps.
                                Many people, are unsure how to tell what's real and what's not.
                                ScamHub Community exists to make scam awareness accessible, simple, and human.
                            </p>
                        </div>
                    </div>
                    <div className={styles.intro1_1} style={{ gridRow: "2", gridColumn: "2" }}>
                        <div>
                            <h1 >Who are the target users?</h1>
                            <p>
                                <strong>Students</strong> and <strong>Elders</strong> are the primary users of ScamHub Community.
                                But anyone who wants to stay safe online can benefit from our platform.
                            </p>
                        </div>
                    </div>
                    <div className={styles.intro1_1} style={{ gridRow: "3", gridColumn: "1" }}>
                        <div>
                            <h1 >Design Philosophy</h1>
                            <ul style={{ padding: "0", paddingLeft: "15px" }}>
                                <li>Community-first</li>
                                <li>Transparency</li>
                                <li>Simplicity</li>
                                <li>Prevention and Reaction</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <svg t="1761800988529" className={`${styles.icon} ${visibleSections.icon2 ? styles.visible : ''}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1666" width="50" height="50">
                        <path d="M762 512L512 912 262 512l250-400z" p-id="1667" fill="white"></path>
                    </svg>
                </div>

                <div className={`${styles.intro2} ${visibleSections.intro2 ? styles.visible : ''}`} style={{ textAlign: "center" }}>
                    <h1>Key Features</h1>
                    <div className={styles.intro2_1}>
                        <div>
                            <svg t="1762205285110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5269" width="100" height="100"><path d="M384 810.666667h128v-258.474667L341.333333 403.370667l-170.666666 148.821333V810.666667h128v-170.666667h85.333333v170.666667z m512 85.333333H128a42.666667 42.666667 0 0 1-42.666667-42.666667v-320.554666a42.666667 42.666667 0 0 1 14.634667-32.170667L256 364.544V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h597.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667z m-213.333333-426.666667v85.333334h85.333333v-85.333334h-85.333333z m0 170.666667v85.333333h85.333333v-85.333333h-85.333333z m0-341.333333v85.333333h85.333333V298.666667h-85.333333z m-170.666667 0v85.333333h85.333333V298.666667h-85.333333z" p-id="5270" fill="#ffffff"></path></svg>
                            <h2 className={styles.featureTitle}>Community Stories</h2>
                            <p>Learn from real scam stories.</p>
                        </div>
                        <div>
                            <svg t="1762205364402" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6338" width="100" height="100"><path d="M1017.312 985.344a22.784 22.784 0 0 1-32.16 0l-145.312-145.312c12.096-9.28 23.456-19.36 33.984-30.368l143.488 143.488a22.752 22.752 0 0 1 0 32.192z m-345.376-153.184a224.032 224.032 0 1 1-0.064-448.064 224.032 224.032 0 0 1 0.064 448.064z m-0.064-384.32a160.32 160.32 0 1 0 0.032 320.64 160.32 160.32 0 0 0-0.032-320.64zM159.52 767.68v-62.496h225.536c6.688 15.968 20.832 48.096 30.08 62.496H159.52z m0-127.52v-64.512h223.968c-0.608 7.52-1.152 25.056-1.152 32.736s0.576 24.224 1.152 31.744H159.52z m0-351.552h225.568v63.488H159.52V288.608z m225.568 222.976s0 0.032 0 0l-225.568 0.032v-62.496h225.568v62.464z m414.336-224.768v69.568c-14.368-9.248-46.528-17.408-62.496-24.064v-12.736H571.872a91.008 91.008 0 0 1-91.008-91.04V64.512H110.272c-25.12 0-45.504 20.416-45.504 45.536v804.96c0 25.12 20.384 45.504 45.504 45.504h581.184c25.12 0 45.504-20.384 45.504-45.504v-36.512c9.312-3.872 35.36-8.16 44.128-12.928l18.368 18.4v48.992A91.008 91.008 0 0 1 708.448 1024H91.296a91.04 91.04 0 0 1-91.04-91.04V91.04A91.008 91.008 0 0 1 91.296 0H531.904l260.864 270.752c8.224 6.752 6.656 16.064 6.656 16.064z m-255.04-186.496v111.264c0 25.12 20.384 45.504 45.504 45.504h118.752l-164.256-156.768z" fill="#ffffff" p-id="6339"></path></svg>
                            <h2 className={styles.featureTitle}>Report and Awareness</h2>
                            <p>Report suspicious activity to protect others.</p>
                        </div>
                        <div>
                            <svg t="1762205434999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7551" width="100" height="100"><path d="M609.376795 658.004305l-0.843204-61.365626 0-70.895677c38.670741-25.780153 74.118068-90.231047 74.118068-90.231047 80.563874-119.233592-6.444782-122.457006-6.444782-122.457006C685.36342 52.963259 504.674151 62.502519 504.664941 62.503543c0 0-161.580049-4.936429-158.066015 250.551406 0 0-87.008656 3.222391-6.444782 122.457006 0 0 35.44835 64.450894 74.118068 90.231047l0 70.895677c0 0-247.733221 93.925183-306.141492 167.57253-66.834174 84.272335 0 138.568962 0 138.568962l410.171824 3.204995 0 0.01842 1.1328-0.00921 1.179872 0.00921 0-0.01842 88.727811-0.721431C609.343025 905.262712 505.151012 798.270932 609.376795 658.004305z" fill="#ffffff" p-id="7552"></path><path d="M767.750825 606.502327c-97.849562 0-177.172165 79.322603-177.172165 177.172165S669.901263 960.846658 767.750825 960.846658s177.172165-79.322603 177.172165-177.172165S865.600387 606.502327 767.750825 606.502327zM746.131435 880.740202l-19.243273-18.828834-0.160659 0.162706-88.944751-87.923492 34.079166-34.280758 72.773444 72.342632 117.889991-125.604696 35.193547 33.137725L746.131435 880.740202z" fill="#ffffff" p-id="7553"></path></svg>
                            <h2 className={styles.featureTitle} >Trust & Profile Verification</h2>
                            <p>Spot and connect with trusted community members.</p>
                        </div>
                        <div>
                            <svg t="1762205466858" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8615" width="100" height="100"><path d="M231.78666667 507.73333333v154.45333334l280.32 146.24 280.53333333-146.24V507.73333333L512.32 653.97333333 231.78666667 507.73333333z m280.53333333-392.64L70.93333333 345.92l441.38666667 230.72 360.96-188.58666667v265.92h80.42666667V345.92L512.32 115.09333333z" p-id="8616" fill="#ffffff"></path></svg>
                            <h2 className={styles.featureTitle}>Learning & Resources</h2>
                            <p>Stay safe with quick, interactive learning guides.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <svg t="1761800988529" className={`${styles.icon} ${visibleSections.icon3 ? styles.visible : ''}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1666" width="50" height="50">
                        <path d="M762 512L512 912 262 512l250-400z" p-id="1667" fill="white"></path>
                    </svg>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px", width: "95%",
                        margin: "auto",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        padding: "10px",
                    }}>
                    <div className={`${styles.intro4} ${visibleSections.intro4 ? styles.visible : ''}`} style={{ textAlign: "center" }}>
                        <h1>Cases</h1>
                        <div className={styles.intro1_2}>
                            <FinalGallery imgset={mockImgs} openSmall={false} themeColor='black' />
                        </div>
                    </div>

                    <div className={`${styles.intro5} ${visibleSections.intro5 ? styles.visible : ''}`} style={{ textAlign: "center" }}>
                        <h1>Demo Video</h1>
                        <div>
                            <iframe width="100%" style={{ aspectRatio: "20/18" }} src="https://www.youtube.com/embed/DguRIuX6lvQ" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>

                <div>
                    <svg t="1761800988529" className={`${styles.icon} ${visibleSections.icon4 ? styles.visible : ''}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1666" width="50" height="50">
                        <path d="M762 512L512 912 262 512l250-400z" p-id="1667" fill="white"></path>
                    </svg>
                </div>

                <div className={`${styles.intro3} ${visibleSections.intro3 ? styles.visible : ''}`} style={{ textAlign: "center" }}>
                    <h1>Team Member</h1>
                    <div className={styles.intro3_1}>
                        <div className={styles.intro3_1_1}>
                            <h2>Junjie Wei</h2>
                            <p>Software Engineer</p>
                        </div>
                        <div className={styles.intro3_1_1}>
                            <h2>Jessica Lee</h2>
                            <p>Software Engineer</p>
                        </div>
                        <div className={styles.intro3_1_1}>
                            <h2>Haoliang Cheng</h2>
                            <p>Software Engineer</p>
                        </div>
                        <div className={styles.intro3_1_1}>
                            <h2>Qijian Li</h2>
                            <p>Software Engineer</p>
                        </div>
                        <div className={styles.intro3_1_1}>
                            <h2>Binyu Zhong</h2>
                            <p>Software Engineer</p>
                        </div>
                        <div className={styles.intro3_1_1}>
                            <h2>Runlin Li</h2>
                            <p>Software Engineer</p>
                        </div>
                    </div>
                </div>
            </main>

            <div className={styles.input_area_fullScreen} ref={input_area_fullScreenRef}>
                <div className={styles.input_area_background} onClick={() => setIsOpen(false)}></div>
                <div className={styles.input_area_container}>
                    <div className={styles.close_button} onClick={() => setIsOpen(false)}>X</div>
                    <div className={styles.input_area_content}>
                        <label>Stay Updated!</label>
                        <form onSubmit={submit}>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                            <button
                                className={styles.submitButton}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Subscribe'}
                            </button>
                            {submitMessage && (
                                <div className={styles.submitMessage}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '4px',
                                        backgroundColor: submitMessage.includes('Successfully') ? '#d4edda' : '#f8d7da',
                                        color: submitMessage.includes('Successfully') ? '#155724' : '#721c24',
                                        border: `1px solid ${submitMessage.includes('Successfully') ? '#c3e6cb' : '#f5c6cb'}`
                                    }}>
                                    {submitMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <footer style={{ marginTop: "150px", paddingTop: "80px", backgroundColor: "black" }}>
                </footer>
            </div>
        </div >
    );
}