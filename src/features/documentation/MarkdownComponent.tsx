import React from 'react';
import {getOverrides, JoyuiMarkdown} from 'joyui-markdown';
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
// You can also use
// import JoyuiMarkdown from 'joyui-markdown';
// But the first approach is recommended.

interface props {
    markdownData: string
}

const MarkdownComponent: React.FC<props> =
    ({markdownData}) => {
        return (
            <JoyuiMarkdown
                overrides={{
                    ...getOverrides({}), // This will keep the other default overrides.
                    ol: {
                        component: List,
                        props: {
                            marker:"decimal",
                            component:"ol"
                        }
                    },
                    ul: {
                        component: List,
                        props: {
                            marker:"circle"
                        }
                    },
                    li: {
                        component: ListItem
                    }
                }}>
                {markdownData}
            </JoyuiMarkdown>);
    };

export default MarkdownComponent;