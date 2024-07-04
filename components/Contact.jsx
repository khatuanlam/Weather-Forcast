const Contact = () => {
    return (
        <div className="mt-8 p-3 rounded-2xl shadow bg-white">
            <p className="mb-4 font-semibold"><span>🔔</span> Contact & Subscribe</p>
            <ul className="flex-row gap-4 divide-y divide-gray-200">
                <a href="" className="hover-link"><li className="py-4"><span>📧</span> Email </li></a>
                <a href="" className="hover-link"><li className="py-4"><span>🌐</span> Github </li></a>
                <a href="" className="hover-link"><li className="py-4"><span>🔗</span> Linkedin </li></a>
            </ul>
        </div>
    )
}

export default Contact;