# Components Directory Structure

This directory contains all Vue components organized by their functionality and purpose.

## Directory Structure

```
components/
├── layout/          # Layout components (header, footer, navigation)
├── ui/              # Reusable UI components (buttons, ratings, forms)
├── media/           # Media-related components (cards, players, galleries)
├── common/          # Common/shared components
└── README.md        # This file
```

## Component Categories

### 📐 Layout Components (`layout/`)
Components that define the overall page structure and layout.

- **AppHeader.vue** - Main navigation header with logo, menu, and search
- **AppFooter.vue** - Site footer with links, social media, and copyright

### 🎨 UI Components (`ui/`)
Reusable user interface components that can be used across the application.

- **MovieRating.vue** - Circular rating display with percentage
- **Button.vue** - Reusable button component (future)
- **Modal.vue** - Modal/dialog component (future)
- **Loading.vue** - Loading spinner component (future)

### 🎬 Media Components (`media/`)
Components specifically related to media content (movies, TV shows, etc.).

- **MediaCard.vue** - Movie/TV show card with poster, title, and rating
- **MediaGrid.vue** - Grid layout for media cards (future)
- **MediaPlayer.vue** - Video player component (future)
- **MediaGallery.vue** - Image gallery component (future)

### 🔧 Common Components (`common/`)
Shared components that don't fit into other categories.

- **Icon.vue** - Icon component (future)
- **Tooltip.vue** - Tooltip component (future)
- **Breadcrumb.vue** - Breadcrumb navigation (future)

## Naming Conventions

- **Layout components**: `Layout[ComponentName]` (e.g., `LayoutAppHeader`)
- **UI components**: `Ui[ComponentName]` (e.g., `UiMovieRating`)
- **Media components**: `Media[ComponentName]` (e.g., `MediaCard`)
- **Common components**: `Common[ComponentName]` (e.g., `CommonIcon`)

## Usage Examples

```vue
<!-- Layout components -->
<LayoutAppHeader />
<LayoutAppFooter />

<!-- UI components -->
<UiMovieRating :score="8.5" />

<!-- Media components -->
<MediaCard :item="movie" />

<!-- Common components -->
<CommonIcon name="star" />
```

## Best Practices

1. **Keep components focused**: Each component should have a single responsibility
2. **Use descriptive names**: Component names should clearly indicate their purpose
3. **Group related components**: Place components in appropriate directories
4. **Follow naming conventions**: Use consistent prefixes for different types
5. **Document complex components**: Add comments for complex logic
6. **Make components reusable**: Design components to be flexible and reusable 