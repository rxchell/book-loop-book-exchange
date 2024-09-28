import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";

interface InterestsProps {
    interests: string[];
}

const Interests: React.FC<InterestsProps> = ({interests}) => {
    return (
        <div>
            <Box>
                <Typography level={"title-md"}>
                    My Interests:
                </Typography>
                {interests.map(interest => (
                    <Chip color="primary"
                        key={interest}>
                        {interest}
                    </Chip>
                ))}
            </Box>
        </div>
    )
}

export default Interests;