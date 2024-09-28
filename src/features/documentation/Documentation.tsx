import React, {useState} from "react";
import DocumentationSelect from "@/features/documentation/DocumentationSelect";
import MarkdownLoader from "@/features/documentation/MarkdownLoader";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";

const Documentation: React.FC =
    () => {
        const [selectedDoc, setSelectedDoc] = useState<string>("index");

        const handleChangeDoc = (doc: string) => {
            setSelectedDoc(doc);
        }

        return (
            <Box p={10}>
               <DocumentationSelect
                   documentation={selectedDoc}
                   onChange={handleChangeDoc}
               />
                <Divider />
                <Box sx={{p:3}}>
                    <MarkdownLoader path={selectedDoc == null ? "index" : selectedDoc}/>
                </Box>

            </Box>
        )
    };

export default Documentation;