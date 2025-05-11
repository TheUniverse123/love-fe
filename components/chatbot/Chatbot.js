'use client'
import { useEffect, useRef, useState } from "react"
import styles from "./Chatbox.module.css"
import { GoogleGenAI } from "@google/genai"

const API_KEY = "AIzaSyCpVlAraW5EBBnw7-5pj0X5UffJFT0yJ_A"
function getCurrentTime() {
    return new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

export default function Chatbot() {
    const inputRef = useRef(null)
    const chatContainerRef = useRef(null)
    const [suggestions, setSuggestions] = useState([{
        text: "🤔 What is WappGPT?",
        action: () => handleSuggestionClick("🤔 What is WappGPT?")
    }, {
        text: "💰 Pricing",
        action: () => handleSuggestionClick("💰 Pricing")
    }, {
        text: "🙋‍♂️ FAQs",
        action: () => handleSuggestionClick("🙋‍♂️ FAQs")
    }])
    const [chatValue, setChatValue] = useState([{
        type: 'ai',
        message: 'Xin chào bạn! Tôi là trợ lý ảo của LOVÉ. Bạn cần tôi giúp gì?',
        time: getCurrentTime()
    }])

    const [isChatbotOpen, setIsChatbotOpen] = useState(false)

    function handleChatbotToggle() {
        setIsChatbotOpen(prevState => !prevState)
    }

    function handleAddDelayMessage() {
        setTimeout(() => {
            setChatValue(prevValue => [...prevValue, { type: 'delay' }])
        }, 200)
    }

    async function generateBotResponse(userMessage) {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: userMessage + ". Hãy trình bày định dạng cho đẹp, xuống dòng tách đoạn cho đẹp",
                config: {
                    maxOutputTokens: 500,
                    temperature: 0.1,
                },
            });
            setChatValue(prevValue => [...prevValue, { type: 'ai', message: response.text, time: getCurrentTime() }])
            generateSuggestions(response.text);
        } catch (error) {
            setChatValue(prevValue => [...prevValue, { type: 'error', message: "Có lỗi xảy ra, vui lòng thử lại sau ⚠", time: getCurrentTime() }])
        } finally {
            setChatValue(prevValue => prevValue.filter(item => item.type !== 'delay').slice(-3))
        }
    }

    async function generateSuggestions(aiResponse) {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `Hãy tạo ra 3 gợi ý (1 gợi ý bắt buộc là 2 từ, có biểu tượng cảm xúc đứng trước mỗi gợi ý, không ghi bất cứ thứ gì thêm) dựa vào response sau: "${aiResponse}"`,
                config: {
                    maxOutputTokens: 100,
                    temperature: 0.2,
                },
            });
            const suggestions = response.text.split('\n').map(text => ({
                text: text.trim().replace("* ", ""),
                action: () => handleSuggestionClick(text.trim())
            }));
            const finalSuggestions = suggestions.filter(suggestion => suggestion.text !== '').slice(-3);
            setSuggestions(finalSuggestions);
        } catch (error) {
            console.error('Error generating suggestions:', error);
            setSuggestions([]);  // Fallback: No suggestions in case of error
        }
    }

    function handleSuggestionClick(suggestion) {
        handleAddDelayMessage()
        console.log(`User clicked suggestion: ${suggestion}`);
        setChatValue(prevValue => [...prevValue, { type: 'user', message: suggestion, time: getCurrentTime() }]);
        generateBotResponse(suggestion);
        setSuggestions([]);
    }

    function handleChatEnter(e) {
        const userMessage = e.target.value.trim()
        const currentTime = getCurrentTime()
        if (e.key === 'Enter' && userMessage) {
            setChatValue(prevValue => [...prevValue, { type: 'user', message: userMessage, time: currentTime }])
            e.target.value = ''
            handleAddDelayMessage()
            generateBotResponse(userMessage)
        }
    }
    function handleSendButton(e) {
        const userMessage = inputRef.current.value.trim()
        const currentTime = getCurrentTime()
        if (userMessage) {
            setChatValue(prevValue => [...prevValue, { type: 'user', message: userMessage, time: currentTime }])
            inputRef.current.value = ''
            handleAddDelayMessage()
            generateBotResponse(userMessage)
        }
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' })
        }
    }, [chatValue]);

    return (
        <>
            <div className={`${styles.chatbotContainer} ${isChatbotOpen ? styles.show : ''}`}>
                <div className={`${styles.chatbotHeader} flex-space`}>
                    <div className="d-flex flex-center">
                        <img className={`${styles.logoAI} mr-10`} src="/assets/icon/chatbot/logo-ai.svg" />
                        <div className={styles.chatbotHeaderInfo}>
                            <p className={`${styles.chatbotHeaderTitle} white-color text-xl-bold`}>Trợ lý Ai - LOVÉ</p>
                            <div className={`flex-start ${styles.infoWrapper}`}>
                                <div className={styles.statusIcon} />
                                <span className={`${styles.statusText} `}>Online</span>
                            </div>
                        </div>
                    </div>

                    <img src="/assets/icon/chatbot/minus-cirlce.svg" className={styles.closeIcon} onClick={() => setIsChatbotOpen(false)}/>
                </div>

                <div ref={chatContainerRef} className={styles.chatbotBody}>
                    {chatValue.map((item, index) => {
                        if (item.type === 'user') {
                            return <div className={styles.chatbodyUserMessage}>
                                <div className="flex-end">
                                    <div className={styles.messageUserContent}>
                                        <div className={styles.messageTriangle}></div>
                                        <pre className={styles.messageText} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                            {item.message}
                                        </pre>
                                        <div className={styles.messageTimeWrapper}>
                                            <span className={styles.messageUserTime}>{item.time}</span>
                                            <img src="/assets/icon/chatbot/delivered.svg" className={styles.checkIcon} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-end">
                                    <img className={styles.avatarUser} />
                                </div>
                            </div>
                        } else if (item.type === 'ai') {
                            return <div className={styles.chatbotBodyAIMessage}>
                                <div className={styles.messageAIContent}>
                                    <div className={styles.messageTriangleRight}></div>
                                    <pre className={styles.messageText} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                        {item.message}
                                    </pre>

                                    <div className={styles.messageAITimeWrapper}>
                                        <span className={styles.messageUserTime}>{item.time}</span>
                                        <img src="/assets/icon/chatbot/delivered.svg" className={styles.checkIcon} />
                                    </div>

                                    <div className={styles.reactSection}>
                                        <img className={styles.reactIcon} src="/assets/icon/chatbot/clipboard-text.svg" />
                                        <img className={styles.reactIcon} src="/assets/icon/chatbot/like.svg" />
                                        <img className={styles.reactIcon} src="/assets/icon/chatbot/dislike.svg" />
                                    </div>
                                </div>
                                <div className="flex-start">
                                    <img className={styles.avatarAI} src="/assets/icon/chatbot/logo-ai.svg" />
                                </div>

                            </div>
                        } else if (item.type === 'delay') {
                            return <div className={styles.chatbotBodyAIMessage}>
                                <div className={`${styles.messageAIContent} ${styles.thinking}`}>
                                    <div className={styles.messageTriangleRight}></div>
                                    <div className={styles.waitingWrapper}>
                                        <div className={styles.dot}></div>
                                        <div className={styles.dot}></div>
                                        <div className={styles.dot}></div>
                                    </div>
                                </div>
                                <div className="flex-start">
                                    <img className={styles.avatarAI} src="/assets/icon/chatbot/logo-ai.svg" />
                                </div>

                            </div>
                        } else if (item.type === 'error') {
                            return <div className={styles.chatbotBodyAIMessage}>
                                <div className={`${styles.messageAIContent} ${styles.error}`}>
                                    <div className={styles.messageTriangleRight}></div>
                                    <p style={{ color: "yellow" }} className={styles.messageText}>{item.message}</p>

                                    <div className={styles.messageAITimeWrapper}>
                                        <span className={styles.messageUserTime}>{item.time}</span>
                                        <img src="/assets/icon/chatbot/delivered.svg" className={styles.checkIcon} />
                                    </div>
                                </div>
                                <div className="flex-start">
                                    <img className={styles.avatarAI} src="/assets/icon/chatbot/logo-ai.svg" />
                                </div>
                            </div>
                        }
                    })}
                </div>
                <div className={styles.chatbotFooter}>
                    <div className={`flex-space mb-10`}>
                        {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                className={`${styles.suggestionButton}`}
                                onClick={suggestion.action}
                            >
                                {suggestion.text}
                            </button>
                        ))}
                    </div>
                    <div className={`${styles.chatbotInputGroup} flex-space`}>
                        <input ref={inputRef} onKeyDown={handleChatEnter} type="text" className={`${styles.inputMessage}`} placeholder="Nhập tin nhắn..." />
                        <img src="/assets/icon/chatbot/send-button.svg" className={styles.sendIcon} onClick={handleSendButton} />
                    </div>
                </div>
            </div>
            <div className={styles.chatbotIcon} onClick={handleChatbotToggle}>
                <img className={styles.avatarAI} src="/assets/icon/chatbot/logo-ai.svg" />
            </div>
        </>
    )
}
