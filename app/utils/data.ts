export const wd = () => {
    const experience = {
        'Product Development and Management': [7, true],
        'Front End Development': [5, true],
        'Full Stack Development': [3, true],
        'DevOps': [2, true],
    }

    const me = 'Ali Azzmzmi'
    const recuitmentStatus = 0
    const facts = [
        ['👉', 'Autodidact', '😁'],
        ['⚙️', 'Workaholic', '🤓'],
        ['💻', 'Typescript lover', '❤️'],
        ['💻', 'Fullstack web dev', '✅'],
        ['💻', 'A designer', '😞🟢'],
        ['✨', 'Knocked UI/UX out', '😵‍💫💫'],
        ['📚', 'Currently learning Rust', '🦀'],
        ['⚡', 'Don\'t like pets', '🐶...'],
    ]

    const techs = (dark?: boolean) => [
        {
            src: "/logos/aws.svg",
            alt: "Amazon Web Services",
            href: "https://aws.amazon.com/",
        },
        {
            src: "/logos/gdev.svg",
            alt: "Google Developers Tools",
            href: "https://developers.google.com/",
        },
        {
            src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
            alt: "Fly.io",
            href: "https://fly.io",
        },
        {
            src: `/logos/${!dark ? "vercel-icon-dark" : "vercel-icon-light"}.svg`,
            alt: "Vercel",
            href: "https://vercel.com",
        },
        {
            src: "/logos/docker.svg",
            alt: "docker",
            href: "https://www.nginx.com/",
        },
        {
            src: "/logos/nginx.svg",
            alt: "NGINX",
            href: "https://docker.com",
        },
        {
            src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
            alt: "Prisma",
            href: "https://prisma.io",
        },
        {
            src: "/logos/node.svg",
            alt: "NodeJS",
            href: "https://nodejs.org",
        },
        {
            src: "/logos/tailwind.svg",
            alt: "Tailwind",
            href: "https://tailwindcss.com",
        },
        {
            src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
            alt: "Cypress",
            href: "https://www.cypress.io",
        },
        {
            src: "/logos/MongoDB_Fores-Green.svg",
            alt: "MongoDB",
            href: "https://www.mongodb.com/",
        },
        {
            src: "https://user-images.githubusercontent.com/1500684/158238105-e7279a0c-1640-40db-86b0-3d3a10aab824.svg",
            alt: "PostgreSQL",
            href: "https://www.postgresql.org/",
        },
        {
            src: "/logos/react.svg",
            alt: "ReactJS",
            href: "https://www.reactjs.org/",
        },
        {
            src: `/logos/${!dark ? "nextjs-icon-dark-background" : "nextjs-icon-light-background"
                }.svg`,
            alt: "NextJS",
            href: "https://www.nextjs.org/",
        },
        {
            src: "/logos/remix.svg",
            alt: "RemixJS",
            href: "https://www.remix.run/",
        },
        {
            src: `/logos/${!dark ? "logo-storybook-default" : "story"}.svg`,
            alt: "Storybook",
            href: "https://storybook.js.org/",
        },
        {
            src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
            alt: "MSW",
            href: "https://mswjs.io",
        },
        {
            src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
            alt: "Vitest",
            href: "https://vitest.dev",
        },
        {
            src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
            alt: "Testing Library",
            href: "https://testing-library.com",
        },
        {
            src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
            alt: "TypeScript",
            href: "https://typescriptlang.org",
        },
    ];

    const repositories = [
        {
            icon: '⚡',
            title: 'Vonage Wrapper',
            description: 'A wrapper around Vonage Server SDK',
            url: 'https://github.com/norassystemes/vonage-wrapper'
        },
        {
            icon: '⬛',
            title: 'Termical',
            description: 'A simple reactjs component to display a terminal',
            url: 'https://github.com/norassystemes/terminal-react',
        },
        {
            icon: '🖨️',
            title: 'Printical',
            description: 'A simple component to print or generate a pdf from a react component.',
            url: 'https://github.com/norassystemes/printical'
        },
        {
            icon: '✨',
            title: 'PDF Gen',
            description: 'A simple AWS service to generate pdf and host it in s3 bucket',
            url: 'https://github.com/SomiDivian/puppeteer-aws-pulumi'
        }
    ]

    const projects = [
        {
            icon: '🦅',
            title: 'Nora\'s Agent Sales',
            description: 'An agents` sales platform for Nora\'s Products',
            url: 'https://www.noras.ltd/',
            png: '/noras-phone.png',
            avif: '/noras.avifs'
        },
        {
            icon: '🚘',
            title: 'mySewa',
            description: 'A Car rental agents management platform.',
            url: 'https://mysewa.net/',
            png: '/sewa-phone.png',
            avif: '/mysewa.avifs'
        },
        {
            icon: '📲',
            title: 'Sales Bane',
            description: 'International Sales Management System (In development)',
            url: 'https://website-2e2a.fly.dev/',
            png: '/sales-phone.png',
            avif: '/salesbane.avifs'
        },
        {
            icon: '🛒',
            title: 'iShop',
            description: 'A demo of a SAAS application, of an E-commerce storefront web app that boosts customer conversion using AI-powered personalization and dynamic pricing.',
            url: 'https://ishop.run/',
            png: '/ishop-front.png',
            avif: '/ishop.avifs'
        },
        {
            icon: '🔰',
            title: 'Aureus.run',
            description: 'Almost ERP (In progress)',
            url: 'https://aureus.run/',
            png: '/aureus-nav.png',
            avif: '/aureus.avifs'
        }
    ]

    const aboutMe = {
        contact: '+60137951707',
        email: 'azzmzmiali@gmail.com',
        website: 'https://azzmi.app'
    }

    return {
        experience,
        me,
        recuitmentStatus,
        facts,
        techs,
        repositories,
        projects,
        aboutMe
    }

}