import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/user.model.js';
import Post from './models/post.model.js';

dotenv.config();

const password = 'Password123!';
const hashedPassword = await bcrypt.hash(password, 10);

const usersData = [
    {
        firstName: 'Aarav',
        lastName: 'Sharma',
        userName: 'aarav.sharma',
        email: 'aarav.sharma@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=11',
        coverImage: 'https://picsum.photos/seed/aarav-cover/1200/400',
        headline: 'Frontend Engineer building accessible product experiences',
        skills: ['React', 'TypeScript', 'UI Design', 'Accessibility'],
        education: [
            {
                college: 'Delhi Technological University',
                degree: 'B.Tech',
                fieldOfStudy: 'Computer Science',
                startingYear: '2017',
                endingYear: '2021',
            },
        ],
        location: 'Bengaluru, India',
        gender: 'male',
        experience: [
            {
                title: 'Frontend Engineer',
                company: 'Atlas Labs',
                description: 'Built reusable UI systems for internal tools.',
                startingYear: '2021',
                endingYear: '2024',
            },
            {
                title: 'UI Developer Intern',
                company: 'Pixel Forge',
                description: 'Worked on responsive marketing pages.',
                startingYear: '2020',
                endingYear: '2021',
            },
        ],
    },
    {
        firstName: 'Isha',
        lastName: 'Mehta',
        userName: 'isha.mehta',
        email: 'isha.mehta@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=32',
        coverImage: 'https://picsum.photos/seed/isha-cover/1200/400',
        headline: 'Product Manager focused on AI workflows and growth',
        skills: ['Product Strategy', 'Roadmapping', 'Analytics', 'A/B Testing'],
        education: [
            {
                college: 'Indian Institute of Management Bangalore',
                degree: 'MBA',
                fieldOfStudy: 'Product Management',
                startingYear: '2018',
                endingYear: '2020',
            },
        ],
        location: 'Mumbai, India',
        gender: 'female',
        experience: [
            {
                title: 'Product Manager',
                company: 'Nova AI',
                description: 'Owned onboarding and activation metrics.',
                startingYear: '2020',
                endingYear: '2024',
            },
        ],
    },
    {
        firstName: 'Kabir',
        lastName: 'Singh',
        userName: 'kabir.singh',
        email: 'kabir.singh@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=15',
        coverImage: 'https://picsum.photos/seed/kabir-cover/1200/400',
        headline: 'Backend Engineer specializing in scalable APIs',
        skills: ['Node.js', 'MongoDB', 'Express', 'System Design'],
        education: [
            {
                college: 'VIT Vellore',
                degree: 'B.Tech',
                fieldOfStudy: 'Information Technology',
                startingYear: '2016',
                endingYear: '2020',
            },
        ],
        location: 'Hyderabad, India',
        gender: 'male',
        experience: [
            {
                title: 'Senior Backend Engineer',
                company: 'CloudCart',
                description: 'Designed APIs powering order and inventory systems.',
                startingYear: '2022',
                endingYear: '2024',
            },
            {
                title: 'Software Engineer',
                company: 'Stacklane',
                description: 'Built authentication and notification services.',
                startingYear: '2020',
                endingYear: '2022',
            },
        ],
    },
    {
        firstName: 'Neha',
        lastName: 'Kapoor',
        userName: 'neha.kapoor',
        email: 'neha.kapoor@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=47',
        coverImage: 'https://picsum.photos/seed/neha-cover/1200/400',
        headline: 'Design systems lead creating consistent interfaces',
        skills: ['Design Systems', 'Figma', 'Interaction Design', 'Prototyping'],
        education: [
            {
                college: 'National Institute of Design',
                degree: 'B.Des',
                fieldOfStudy: 'Communication Design',
                startingYear: '2015',
                endingYear: '2019',
            },
        ],
        location: 'Pune, India',
        gender: 'female',
        experience: [
            {
                title: 'Design Systems Lead',
                company: 'Orbit Studio',
                description: 'Scaled visual language across product surfaces.',
                startingYear: '2021',
                endingYear: '2024',
            },
        ],
    },
    {
        firstName: 'Rohan',
        lastName: 'Verma',
        userName: 'rohan.verma',
        email: 'rohan.verma@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=18',
        coverImage: 'https://picsum.photos/seed/rohan-cover/1200/400',
        headline: 'Data Analyst translating metrics into decisions',
        skills: ['SQL', 'Python', 'Tableau', 'Forecasting'],
        education: [
            {
                college: 'University of Delhi',
                degree: 'B.Sc',
                fieldOfStudy: 'Statistics',
                startingYear: '2016',
                endingYear: '2019',
            },
        ],
        location: 'Delhi, India',
        gender: 'male',
        experience: [
            {
                title: 'Data Analyst',
                company: 'SignalWorks',
                description: 'Built dashboards and weekly performance reporting.',
                startingYear: '2019',
                endingYear: '2024',
            },
        ],
    },
    {
        firstName: 'Ananya',
        lastName: 'Iyer',
        userName: 'ananya.iyer',
        email: 'ananya.iyer@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=25',
        coverImage: 'https://picsum.photos/seed/ananya-cover/1200/400',
        headline: 'Full-stack developer shipping practical web products',
        skills: ['React', 'Node.js', 'REST APIs', 'PostgreSQL'],
        education: [
            {
                college: 'Anna University',
                degree: 'B.E',
                fieldOfStudy: 'Computer Science',
                startingYear: '2017',
                endingYear: '2021',
            },
        ],
        location: 'Chennai, India',
        gender: 'female',
        experience: [
            {
                title: 'Full-stack Developer',
                company: 'Buildify',
                description: 'Delivered customer-facing dashboards and admin tools.',
                startingYear: '2021',
                endingYear: '2024',
            },
        ],
    },
    {
        firstName: 'Arjun',
        lastName: 'Nair',
        userName: 'arjun.nair',
        email: 'arjun.nair@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=61',
        coverImage: 'https://picsum.photos/seed/arjun-cover/1200/400',
        headline: 'Mobile engineer crafting seamless app interactions',
        skills: ['React Native', 'iOS', 'Android', 'Performance'],
        education: [
            {
                college: 'Amrita Vishwa Vidyapeetham',
                degree: 'B.Tech',
                fieldOfStudy: 'Computer Engineering',
                startingYear: '2016',
                endingYear: '2020',
            },
        ],
        location: 'Kochi, India',
        gender: 'male',
        experience: [
            {
                title: 'Mobile Engineer',
                company: 'PocketFlow',
                description: 'Shipped cross-platform user flows and push notifications.',
                startingYear: '2020',
                endingYear: '2024',
            },
        ],
    },
    {
        firstName: 'Meera',
        lastName: 'Joshi',
        userName: 'meera.joshi',
        email: 'meera.joshi@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=44',
        coverImage: 'https://picsum.photos/seed/meera-cover/1200/400',
        headline: 'Content strategist building brand voice and community',
        skills: ['Copywriting', 'Content Strategy', 'Brand Voice', 'Community'],
        education: [
            {
                college: 'Symbiosis International University',
                degree: 'BA',
                fieldOfStudy: 'Media and Communication',
                startingYear: '2015',
                endingYear: '2018',
            },
        ],
        location: 'Ahmedabad, India',
        gender: 'female',
        experience: [
            {
                title: 'Content Strategist',
                company: 'Storyline Media',
                description: 'Led editorial planning and social media narratives.',
                startingYear: '2019',
                endingYear: '2024',
            },
        ],
    },
    {
        firstName: 'Dev',
        lastName: 'Patel',
        userName: 'dev.patel',
        email: 'dev.patel@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=52',
        coverImage: 'https://picsum.photos/seed/dev-cover/1200/400',
        headline: 'DevOps engineer automating delivery and reliability',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        education: [
            {
                college: 'IIIT Hyderabad',
                degree: 'M.Tech',
                fieldOfStudy: 'Software Engineering',
                startingYear: '2018',
                endingYear: '2020',
            },
        ],
        location: 'Noida, India',
        gender: 'male',
        experience: [
            {
                title: 'DevOps Engineer',
                company: 'ReleaseGrid',
                description: 'Managed deployment pipelines and cloud infrastructure.',
                startingYear: '2020',
                endingYear: '2024',
            },
        ],
    },
    {
        firstName: 'Sara',
        lastName: 'Khan',
        userName: 'sara.khan',
        email: 'sara.khan@example.com',
        profileImage: 'https://i.pravatar.cc/300?img=5',
        coverImage: 'https://picsum.photos/seed/sara-cover/1200/400',
        headline: 'Software engineer interested in product thinking',
        skills: ['JavaScript', 'React', 'APIs', 'Testing'],
        education: [
            {
                college: 'University of Mumbai',
                degree: 'B.Sc',
                fieldOfStudy: 'Information Technology',
                startingYear: '2017',
                endingYear: '2021',
            },
        ],
        location: 'Surat, India',
        gender: 'female',
        experience: [
            {
                title: 'Software Engineer',
                company: 'BrightStack',
                description: 'Worked across product features and bug fixes.',
                startingYear: '2021',
                endingYear: '2024',
            },
        ],
    },
];

const postTopics = [
    'shipping a new feature',
    'learning from a product launch',
    'building better team workflows',
    'sharing a design iteration',
    'reflecting on a technical challenge',
    'experimenting with a side project',
    'writing about career growth',
    'thinking about clean architecture',
    'improving onboarding',
    'celebrating a small win',
];

const postImages = [
    'https://picsum.photos/seed/post-1/1200/800',
    'https://picsum.photos/seed/post-2/1200/800',
    'https://picsum.photos/seed/post-3/1200/800',
    'https://picsum.photos/seed/post-4/1200/800',
    'https://picsum.photos/seed/post-5/1200/800',
    'https://picsum.photos/seed/post-6/1200/800',
    'https://picsum.photos/seed/post-7/1200/800',
    'https://picsum.photos/seed/post-8/1200/800',
    'https://picsum.photos/seed/post-9/1200/800',
    'https://picsum.photos/seed/post-10/1200/800',
];

const buildPostDescription = (user, topic, index) =>
    `${user.firstName} ${user.lastName} is ${topic}. Post ${index + 1} of the day.`;

const buildComments = (users, authorIndex, postIndex) => {
    const comments = [];
    const firstCommenter = users[(authorIndex + 1) % users.length];
    const secondCommenter = users[(authorIndex + 2) % users.length];

    comments.push({
        content: `Nice update on ${postTopics[(postIndex + 2) % postTopics.length]}.`,
        user: firstCommenter._id,
    });

    if ((postIndex + authorIndex) % 2 === 0) {
        comments.push({
            content: 'This is a solid direction for the team.',
            user: secondCommenter._id,
        });
    }

    return comments;
};

const buildLikes = (users, authorIndex, postIndex) => {
    const likes = [];
    const firstLike = users[(authorIndex + 3) % users.length];
    const secondLike = users[(authorIndex + 5) % users.length];

    likes.push(firstLike._id);
    if ((postIndex + authorIndex) % 3 !== 0) {
        likes.push(secondLike._id);
    }

    return likes;
};

const buildSeedPostsForUser = (user, userIndex, users) => {
    const postCount = 5 + (userIndex % 6);
    const posts = [];

    for (let i = 0; i < postCount; i += 1) {
        const topic = postTopics[(userIndex + i) % postTopics.length];
        const shouldAddImage = (userIndex + i) % 2 === 0;
        const description = buildPostDescription(user, topic, i);

        posts.push({
            author: user._id,
            description,
            image: shouldAddImage
                ? postImages[(userIndex + i) % postImages.length]
                : '',
            like: buildLikes(users, userIndex, i),
            comment: buildComments(users, userIndex, i),
        });
    }

    return posts;
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        const createdUsers = [];

        for (const user of usersData) {
            const seedUser = await User.findOneAndUpdate(
                { email: user.email },
                {
                    $setOnInsert: {
                        ...user,
                        password: hashedPassword,
                    },
                },
                { new: true, upsert: true }
            );
            createdUsers.push(seedUser);
        }

        const postsToInsert = [];

        for (const [userIndex, user] of createdUsers.entries()) {
            const seedPosts = buildSeedPostsForUser(
                user,
                userIndex,
                createdUsers
            );
            const seedDescriptions = seedPosts.map((post) => post.description);

            const existingPosts = await Post.find({
                author: user._id,
                description: { $in: seedDescriptions },
            })
                .select('description')
                .lean();

            const existingDescriptions = new Set(
                existingPosts.map((post) => post.description)
            );

            seedPosts.forEach((post) => {
                if (!existingDescriptions.has(post.description)) {
                    postsToInsert.push(post);
                }
            });
        }

        if (postsToInsert.length > 0) {
            await Post.insertMany(postsToInsert);
        }

        console.log(
            `Seeded ${createdUsers.length} users and ${postsToInsert.length} posts`
        );
        console.log(`Default password for every user: ${password}`);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
}

await seed();
