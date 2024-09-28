import React, {useState, useEffect} from 'react';
import MarkdownComponent from "@/features/documentation/MarkdownComponent";

interface MarkdownLoaderProps {
    path: string;
}

const MarkdownLoader: React.FC<MarkdownLoaderProps> = ({path}) => {

    const [content, setContent] = useState<string>('');

    useEffect(() => {
            const loadMarkdown = async () => {
                try {
                    const response = await fetch(`/docs/${path}.md`)
                    console.log(response)
                    setContent(await response.text())
                } catch (e) {
                    setContent("Invalid page.")
                }
            }

            loadMarkdown();
        }, [path]
    )

    useEffect(() => {
        console.log(content);
    }, [content]);

    return (
        <div>
            <MarkdownComponent
                markdownData={content}
            />
        </div>
    );
};

export default MarkdownLoader;