import { BiBriefcase, BiHealth, BiLock, BiLogoProductHunt, BiSolidBusiness, BiUser } from "react-icons/bi";
import { BsSpellcheck } from "react-icons/bs";
import { PiComputerTower, PiPoliceCar } from "react-icons/pi";

export const ENQUIRY_TAGS = [
    {
        label: 'Health and Safety',
        Icon: <BiHealth />
    },
    {
        label: 'Quality Control',
        Icon: <PiPoliceCar />
    },
    {
        label: 'Company Policies',
        Icon: <BiSolidBusiness />
    },
    {
        label: 'People Management',
        Icon: <BiUser />
    },
    {
        label: 'IT',
        Icon: <PiComputerTower />
    },
    {
        label: 'Security',
        Icon: <BiLock />
    },
];

export const QUICK_ACTIONS = [
    {
        label: 'Grammer Check',
        Icon: <BsSpellcheck />,
        prompt: 'I need help with a grammer check for a phrase'
    },
    {
        label: 'Explain the QHS Policy',
        Icon: <BiBriefcase />,
        prompt: 'Explain the QHS Policy',
    },
    {
        label: "Explain RusselSmith's Services",
        Icon: <BiLogoProductHunt />,
        prompt: "Explain RusselSmith's Services",
    },
];