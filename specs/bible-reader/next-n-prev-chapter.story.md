# User Story: Read chapter

As a **Bible researcher**\
I want to switch between the previous and the next chapter\
In order to navigate quickly

## Acceptance Criteria

### R1: user can go to the next chapter within a book

E: should go from the chapter 1 to the chapter 2 of Genesis by next chapter

E: should go from the psalm 1 to the psalm 2 by next chapter

E: should stay in the same book when switching from chapter 5 to 6 in the Gospel of Mark

### R2: when user reaches the last chapter of the book it switches to the next book

E: should go to the chapter 1 of Exodus from Genesis 50 by next chapter

E: should go from Malachi 4 to Matthew 1 by next chapter

### R3: when user reaches the last chapter of the last book of the Bible it disables next chapter

E: should not provide the next chapter when reading Revelation 22

### R4: user can go to the previous chapter within a book

E: should go from the chapter 2 to the chapter 1 of Genesis by previous chapter

E: should go from the psalm 119 to the psalm 118 by previous chapter

### R5: when user reaches the first chapter of a book it switches to the last chapter of the previous book

E: should go to the chapter 50 of Genesis from Exodus 1 by previous chapter

E: should go to the chapter 4 of Malachi from Matthew 1 by previous chapter

### R6: when user reaches the first chapter of the first book of the Bible it disables previous chapter

E: should not provide the previous chapter when reading Genesis 1

### R7: system handles single-chapter books seamlessly

E: should go directly from Obadiah 1 to Jonah 1 by next chapter

E: should go directly from Jude 1 to Revelation 1 by next chapter

E: should go directly from Jonah 1 to Obadiah 1 by previous chapter
