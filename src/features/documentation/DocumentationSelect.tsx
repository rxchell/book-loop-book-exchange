import * as React from 'react';
import Box from '@mui/joy/Box';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import index from '~/docs/index.json'

interface DocumentationSelectProps {
    documentation: string;
    onChange: (documentation: string) => void;
}

const DocumentationSelect: React.FC<DocumentationSelectProps> = ({documentation, onChange}) => {
    const handleChange = (event: React.SyntheticEvent | null,
                          newValue: string | null,) => {
        onChange(newValue as string);
    };

    return (
        <Box sx={{minWidth: 120}}>

            <form>
                <Select
                    name="timetable-select"
                    value={documentation}
                    onChange={handleChange}
                    placeholder={"Choose the topic"}
                    defaultValue="index"
                    variant="soft"
                >
                    {index.map((d) => (
                        <Option key={d.name} value={d.name}>
                            {d.topic}
                        </Option>
                    ))}
                </Select>
            </form>
        </Box>
    )
        ;
};

export default DocumentationSelect;