# Infinite Scroll without Layout Shifts

**July 30, 2020**

Today, we'll look at how patterns for loading long lists can impact the Core Web Vitals with some recommended fixes.

## Overview

Infinite scrolling is a loading strategy where new content is fetched and rendered while the user scrolls down a page. There isn't a Load More button or Next link; the fetches for more content are automatically made in the background.

This pattern has been popularized by social media platforms like Twitter, where tweets load automatically as you scroll down the timeline. It is a type of pagination that watches the scroll location rather than requiring navigation clicks. Once users reach the edge, the next batch of content is fetched.

**Major benefit**: Allows users to stay engaged and keep browsing continuously.

## Loading Strategies Comparison

### Pagination

Dividing content into pages remains the most popular UX strategy. Benefits include:

- Provides a sense of location (URL)
- Clear navigation choices
- Better for accessibility and SEO
- Widely adopted pattern

**Trade-off**: Requires clicks to navigate, which may reduce mobile engagement.

> **Note**: Googlebot doesn't scroll through pages. If SEO matters, support pagination alongside infinite scroll.

### Load More

A hybrid between pagination and infinite scrolling:

- Users click a button to load new content
- Gives users control and logical breaks
- Lets users pause before loading more content

## Layout Shift Challenges

Infinite scrolling and Load More can cause **Cumulative Layout Shift (CLS)** issues in two scenarios:

### 1. Footer Content Gets Pushed Down

If you have footers, newsletters, or social links below your list, infinite scroll constantly pushes this content down, causing layout shifts and worsening CLS scores.

> **Impact**: Content continuously moves out of view as new items load.

### 2. Insufficient Space Reserved

When new content loads without pre-reserved space, elements "pop" into place, causing unexpected shifts. This happens if:

- Content isn't prefetched ahead of time
- Placeholders have different dimensions than final content
- No space is reserved for upcoming rows

## Cumulative Layout Shift (CLS) Explained

CLS measures layout shifts when elements change position in the viewport. Chrome allows a **500ms window** for user-initiated shifts (clicks, taps, keys) to be excluded from scoring.

**Important**: Scrolling doesn't get the 500ms allowance—only direct input does.

## How to Avoid Layout Shifts

### Key Strategies

1. **Reserve Space**: Use properly-sized skeleton placeholders matching final content dimensions
2. **Remove Footers**: Eliminate bottom elements that get pushed down during loads
3. **Prefetch Content**: Load data and images for below-the-fold content before users scroll there

### Best Practices

- Implement skeleton UI before new content renders
- Match placeholder dimensions exactly to final content
- Fetch data proactively for a smooth experience
- Complete transitions within the 500ms threshold

## Efficient List Implementation

### List Virtualization

Libraries like `react-window` are excellent for optimizing long lists by:

- Maintaining a small container "window"
- Absolutely positioning visible children only
- Rendering only items in the user's viewport
- Avoiding rendering 1000s of DOM elements at once

**Result**: Seamless scrolling without layout shifts, especially when combined with prefetching and content-free footers.
