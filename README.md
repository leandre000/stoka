# ☕ Stoka - Coffee Management System

A comprehensive, modern coffee management system built with Next.js, TypeScript, and Tailwind CSS. Stoka provides a complete solution for managing coffee businesses, from inventory tracking to customer management.

## ✨ Features

- **Modern UI/UX**: Beautiful, responsive design with coffee-themed aesthetics
- **Product Management**: Complete inventory tracking and management
- **Service Management**: Service-based business operations
- **Dashboard Analytics**: Real-time insights and reporting
- **Multi-portal Support**: Separate portals for products and services
- **AI Chat Integration**: Intelligent customer support
- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode Support**: Elegant dark and light themes

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Theming**: next-themes

## 🎨 Design System

Stoka features a modern coffee-inspired design system:

- **Primary Colors**: Warm coffee browns and amber tones
- **Typography**: Inter font family for optimal readability
- **Components**: Consistent, accessible UI components
- **Gradients**: Beautiful coffee-themed gradients
- **Icons**: Coffee bean and modern business icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/stoka.git
cd stoka
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
stoka/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── product/           # Product portal
│   ├── service/           # Service portal
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── *.tsx            # Custom components
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎯 Key Components

- **Sidebar Navigation**: Modern sidebar with coffee-themed branding
- **Dashboard**: Comprehensive analytics and overview
- **Product Management**: Inventory tracking and management
- **Service Management**: Service operations and client management
- **AI Chat**: Intelligent customer support system
- **Reports**: Detailed analytics and reporting

## 🎨 Customization

### Colors
The system uses a coffee-themed color palette defined in `tailwind.config.ts`:

```typescript
coffee: {
  '50': '#fef7f0',
  '100': '#fdecd8',
  '200': '#fbd5b0',
  '300': '#f8b87d',
  '400': '#f49444',
  '500': '#f17a1a',
  '600': '#e25f0f',
  '700': '#bc470f',
  '800': '#963a13',
  '900': '#7a3214',
  '950': '#421808',
}
```

### Branding
Update the branding in:
- `app/layout.tsx` - Page title and metadata
- `components/sidebar.tsx` - Navigation branding
- `public/favicon.svg` - Favicon
- `public/stoka-logo.svg` - Logo

## 📱 Responsive Design

Stoka is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌙 Dark Mode

The system supports both light and dark modes with coffee-themed color schemes for both themes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ☕ About Stoka

Stoka is designed specifically for coffee businesses, providing a comprehensive management solution that combines modern technology with the warmth and tradition of coffee culture. Whether you're running a coffee shop, roastery, or coffee farm, Stoka helps you manage every aspect of your business efficiently.

---

**Built with ☕ and ❤️ for the coffee community** 