# Contributing to AI Toolbox & Learning Hub

Thank you for your interest in contributing! This document provides guidelines and best practices for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Adding New Tools](#adding-new-tools)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Report unacceptable behavior to project maintainers

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-toolbox.git
   cd ai-toolbox/ai-toolbox-react
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Create a new branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following our coding standards
3. **Test your changes**:
   ```bash
   npm run test
   npm run build
   ```
4. **Commit your changes** with a descriptive message
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** on GitHub

## Coding Standards

### JavaScript/React
- Use functional components with hooks
- Follow ESLint rules (run `npm run lint`)
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused

### Component Structure
```jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Brief description of component
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 */
export default function MyComponent({ title }) {
  // Component logic
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
};
```

### CSS
- Use CSS variables for theming (defined in `index.css`)
- Follow BEM naming for complex components
- Prefer utility classes for simple styling
- Ensure responsive design (mobile-first)

### Accessibility
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers if possible
- Maintain sufficient color contrast (4.5:1 minimum)

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```bash
feat(tools): add new AI coding assistant

Add support for Cursor IDE in tools database with pricing and features.

Closes #42
```

```bash
fix(api): handle network timeout in Gemini API

Add proper error handling and retry logic for network timeouts.

Fixes #38
```

## Pull Request Process

1. **Update documentation** if needed (README, comments, etc.)
2. **Add tests** for new features
3. **Ensure all tests pass**: `npm run test`
4. **Update CHANGELOG.md** if applicable
5. **Fill out PR template** completely
6. **Request review** from maintainers
7. **Address feedback** promptly

### PR Checklist
- [ ] Code follows project coding standards
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Accessibility checked
- [ ] No merge conflicts

## Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Place test files next to the component: `Component.test.jsx`
- Use React Testing Library for component tests
- Test user interactions, not implementation details
- Aim for >80% code coverage

### Test Structure
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('handles user interaction', async () => {
    const { user } = render(<MyComponent />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

## Adding New Tools

To add a new AI tool to the database:

1. **Edit `src/data/tools.js`**:
   ```javascript
   {
     id: 'unique-slug',
     name: 'Tool Name',
     desc: 'Brief description (1-2 sentences)',
     logo: '🤖', // Emoji or URL
     url: 'https://example.com',
     affiliateUrl: '', // Optional: affiliate link
     category: 'category-name', // See categories below
     price: 'Free / $10/mo', // Pricing info
     tags: ['tag1', 'tag2', 'tag3'], // Relevant tags
     proBenefits: [
       'Pro benefit 1',
       'Pro benefit 2'
     ], // Optional: for paid tools
   }
   ```

2. **Categories**:
   - `chat` - Conversational AI
   - `image` - Image generation
   - `video` - Video creation
   - `voice` - Audio/voice synthesis
   - `code` - Code assistance
   - `writing` - Content writing
   - `research` - Research & analysis
   - `productivity` - Productivity tools
   - `data` - Data analysis

3. **Verify your addition**:
   ```bash
   npm run lint
   npm run test
   npm run dev
   ```

4. **Take a screenshot** of the tool card in light and dark mode

5. **Submit PR** with:
   - Description of the tool
   - Why it's useful
   - Screenshots
   - Any affiliate disclosure

## Questions?

- Check existing [Issues](https://github.com/YOUR_USERNAME/ai-toolbox/issues)
- Open a new issue for discussion
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing! 🎉
