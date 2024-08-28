import React, {useState} from 'react';
import {ArrowRight, Home, Users, House} from 'lucide-react';

const mbtiTypes = [
        {
            id: 'INTJ',
            label: 'INTJ - Architect',
            colors: ['#6B8E23', '#8B4513', '#D2B48C'], // Earth Colors (Green, Brown, Tan)
            description: 'You have an intelligent and curious personality, and you usually prefer being alone than engaging with others. However, that doesn’t mean you’re closed off. You have a strong tie to nature and natural elements, so it makes sense that earth tones would suit you well. Shades of green, brown, and tan allow you to feel grounded, but still open to possibilities that come your way.',
            image: "https://www.thespruce.com/thmb/j4qsL45P8yqzt9T8NWklimfW7z0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/INTJ-e7cb2eda8c074a5c8df78510f96da3d8.jpg",
        },
        {
            id: 'INTP',
            label: 'INTP - Logician',
            colors: ['#2F4F4F', '#708090', '#000000'], // Dark Green, Gray, Black
            description: 'You’re intellectually intense and prefer to fly under the radar, but that doesn’t mean you’re bored with your color choices. You prefer to lean into darker shades like hunter green, gray, and black, but you’ll incorporate a burnt orange or a pale yellow to brighten things up and get your mind energized.',
            image: "https://static01.nyt.com/images/2019/03/18/us/18xp-flintstone/fileupload-1552932968132-superJumbo.jpg"
        },
        {
            id: 'ENTJ',
            label:
                'ENTJ - Commander',
            colors:
                ['#FF4500', '#000000', '#8B4513', '#FFFFFF'], // Red, Black, Brown, White
            description:
                'You are someone who strives to achieve your goals, and you’re relentless in the pursuit. You like to hold some structure, but you refuse to be ignored or to blend into the background. Red is a color you’re often drawn to because of its associations with power and strength. Anchoring it with brown, white, and black shades gives a unique spin on traditional neutral palettes while also giving you a sense of control and accomplishment.',
            image:
                "https://images.nestseekers.com/_next/image?url=https://photos.nestseekers.com/Apt/window_aPU0zK7.PNG&w=3840&q=70"
        }
        ,
        {
            id: 'ENTP',
            label:
                'ENTP - Debater',
            colors:
                ['#000080', '#40E0D0', '#FFA500'], // Navy, Turquoise, Orange
            description:
                'You have an unconventional attitude and take great joy in choosing unexpected paths. Your ideas are limitless, but your emotional side is reserved and a little cynical. You like darker shades that give a great base to work with, such as a deep navy blue, and pairing them with bright, contrasting hues. Orange accents and various shades in between bring together a look that is eye-catching and unique without going overboard on neon shades.',
        }
        ,
        {
            id: 'INFJ',
            label:
                'INFJ - Advocate',
            colors:
                ['#FFD700', '#FFC0CB', '#87CEEB', '#228B22'], // Yellow, Pink, Sky Blue, Nature Green
            description:
                'You prefer to be a little unconventional, and you love to share your unique perspective of the world. You don’t see yourself as someone who throws together things chaotically just to stand out, though. You think things through, and you put so much effort into the spaces you create for yourself. While shades such as sky blue, pink, and nature green might not seem controversial, they illuminate a daydream vibe that makes you feel right at home.',
        }
        ,
        {
            id: 'INFP',
            label:
                'INFP - Mediator',
            colors:
                ['#ADD8E6', '#FF69B4'], // Soft Blues, Bright Pinks
            description:
                'You have a reputation for having your head in the clouds, so it’s no surprise that colors associated with the sky would suit you well! You are introspective and prefer to dwell in the ideas and hopes you have for yourself, so light and airy colors find their way to you easily. Soft shades of blue and white are gentle and classic, but other shades of light pink, purple, and peach interwoven create something magical, almost fairytale-like.',
        }
        ,
        {
            id: 'ENFJ',
            label:
                'ENFJ - Protagonist',
            colors:
                ['#800080', '#FFC0CB', '#808080'], // Deep Purple, Pink, Gray
            description:
                'You have a heart that genuinely seeks to love other people and make them feel safe with you. You are approachable but grounded, and others come to you for comfort and advice often. You are drawn to colors that are light-hearted and open, but still, give a sense of security. Deep purple shades aren’t overwhelming or overly bright, but they still give off the vibe of feeling safe and comfortable. Adding in shades of pink can help brighten things up a little without losing the peaceful atmosphere that you thrive in.',
        }
        ,
        {
            id: 'ENFP',
            label:
                'ENFP - Campaigner',
            colors:
                ['#FF4500', '#4682B4', '#FAFAD2'], // Sunset Orange, Ocean Blue, Pale Yellow
            description:
                'ENFP’s give off exuberant energy that draws others to them, while also containing depth in thought and conversation. With a bright personality and a tendency to switch topics quickly, you are likable even in your contrasting nature. A bright hue such as a sunset orange that grabs people’s attention makes perfect sense, paired with an ocean blue and a pale yellow that helps balance things out (with a neutral color such as black or grey to work as an anchor ultimately). Your fearless nature means you don’t hesitate to take on brighter colors or contrasting ideas, because you can pull the best of multiple things together to highlight their best features.',
        }
        ,
// Add other MBTI types here with their corresponding colors and descriptions
    ]
;

const housingOptions = [
    {id: 'quiet-apartment', label: 'Quiet Apartment', suitableFor: ['INTJ', 'INTP', 'ISTJ', 'ISFJ']},
    {id: 'social-house', label: 'Social House', suitableFor: ['ENFP', 'ENTP', 'ESFP', 'ESTP']},
    {id: 'creative-loft', label: 'Creative Loft', suitableFor: ['INFP', 'ENFP', 'ISFP', 'ESFP']},
    {id: 'structured-dorm', label: 'Structured Dorm', suitableFor: ['ESTJ', 'ENTJ', 'ISTJ', 'INTJ']},
    {id: 'eco-community', label: 'Eco-friendly Community', suitableFor: ['INFJ', 'ENFJ', 'ISFJ', 'ESFJ']},
];

const PersonalityMatchingWebsite = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [matchedHousing, setMatchedHousing] = useState([]);
    const [matchedRoommates, setMatchedRoommates] = useState([]);

    const handleTypeSelection = (typeId) => {
        setSelectedType(typeId);
        findMatches(typeId);
    };

    const findMatches = (typeId) => {
        if (!typeId) return;

        const housing = housingOptions.filter((option) =>
            option.suitableFor.includes(typeId)
        );
        setMatchedHousing(housing);

        // Simulating roommate matching based on MBTI compatibility
        const roommates = [
            {name: 'Alex', type: 'INTJ'},
            {name: 'Sam', type: 'ENFP'},
            {name: 'Jordan', type: 'ISFJ'},
            {name: 'Taylor', type: 'ESTP'},
        ].filter((roommate) => isCompatible(typeId, roommate.type));
        setMatchedRoommates(roommates);
    };

    // Simple compatibility check (can be expanded for more accurate matching)
    const isCompatible = (type1, type2) => {
        if (type1 === type2) return true;
        if (type1[0] !== type2[0]) return true; // Opposite on E/I often compatible
        return Math.random() > 0.5; // Randomize some matches for variety
    };

    const selectedMBTI = mbtiTypes.find((type) => type.id === selectedType);
    const backgroundColor = selectedMBTI ? selectedMBTI.colors[0] : '#FFFFFF'; // Use the first color as the background
    const interior = selectedMBTI ? selectedMBTI.image : null;
    return (
        <div
            className="max-w-4xl mx-auto p-6 font-sans"
            style={{backgroundColor: backgroundColor, transition: 'background-color 0.5s ease'}}
        >
            <h1 className="text-3xl font-bold mb-6 text-center">Find My Nest</h1>
            <img src={"https://t4.ftcdn.net/jpg/06/10/94/17/360_F_610941780_pf8Y0DSrSuhy0yPO6niNPLL5ROcPuBJ1.jpg"}
                 className={"rounded-3xl"}/>


            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Select Your MBTI Personality Type:</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {mbtiTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => handleTypeSelection(type.id)}
                            className={`px-4 py-2 rounded-lg ${
                                selectedType === type.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {selectedMBTI && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Recommended Color Palette for {selectedMBTI.label}:</h2>
                    <p><strong>Colors:</strong> {selectedMBTI.colors.join(', ')}</p>
                    <p>{selectedMBTI.description}</p>
                </div>
            )}

            <button
                onClick={() => findMatches(selectedType)}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center mb-8"
                disabled={!selectedType}
            >
                Find Matches <ArrowRight className="ml-2"/>
            </button>

            {matchedHousing.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Home className="mr-2"/> Matching Housing Options:
                    </h2>
                    <ul className="list-disc pl-6">
                        {matchedHousing.map((option) => (
                            <li key={option.id} className="mb-2">
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {matchedRoommates.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Users className="mr-2"/> Potential Roommate Matches:
                    </h2>
                    <ul className="list-disc pl-6">
                        {matchedRoommates.map((roommate) => (
                            <li key={roommate.name} className="mb-2">
                                {roommate.name} ({roommate.type})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {interior && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <House className="mr-2"/> Potential Interior Decoration Recommendations:
                    </h2>
                    <img src={interior} alt
                        ={"MBTI Type"} className="rounded-lg w-full"/>
                </div>
            )}
        </div>
    );
};

export default PersonalityMatchingWebsite;
