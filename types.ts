export enum AppView {
  HOME = 'HOME',
  BOOK = 'BOOK',
}

export interface StoryPage {
  type?: 'chapter' | 'profile';
  layout?: 'standard' | 'full-image'; // New property to control layout
  text: string;
  imageKeyword?: string; // Used to fetch a relevant image randomly
  imageUrl?: string; // New property to specify a direct image URL
  chapterTitle?: string;
  studentName?: string; // Specific for student profiles
}

export interface Story {
  title: string;
  author: string;
  pages: StoryPage[];
}

export interface FlipbookProps {
  story: Story;
  onClose: () => void;
}