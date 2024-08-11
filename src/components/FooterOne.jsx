import { footerSections } from "../utils/FooterContents"

const FooterOne = () => {
    return (
        <div className="bg-amazon_blue-light grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 border-b border-gray-700 py-8 px-32">
            {footerSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <h3 className="text-white font-bold mb-2">{section.title}</h3>
                    <ul>
                        {section.links.map((link, linkIndex) => (
                            <li key={linkIndex} className="mb-1">
                                <a href={link.url} className="text-gray-400 text-sm hover:underline">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default FooterOne