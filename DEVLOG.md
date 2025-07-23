# DEVLOG.md

## 🔮 Developer Log: Spellweaver App

### July 22
**Focus**: Spellbook UI, casting interaction, MagicalParticles integration.

**Progress:**
- SpellCard abstraction and casting logic done
- Mystical theme applied (fonts, shimmer, particles)
- Grid-based Spellbook UI finished

**Next:**
- Add mood tracking to journal entries
- Hook in persistent spell storage (localStorage)
- Implement tag-based filtering for spell visibility

---

### July 23
**Focus**: Sprint Progress Review + Suggested Enhancements

**What's Done:**
- Splash screen & navigation
- Spell creation, editing, and pop-up info view
- Sprint 1 almost complete (missing: auth, tags)

**To Do Next:**
- ✅ Tag filter system in SpellBook
- ✅ Persistent spell data via localStorage
- ✅ Confirmation dialog for delete
- ✅ Smooth page transitions (Framer Motion)
- ✅ Theme toggle: light/dark with DaisyUI

---

### July 24
**Focus**: Plan journal entry tracking

**Planning Notes:**
- JournalEntry component
  - Mood before/after dropdown
  - Notes text area
  - Link to spell usage
- Consider timeline or calendar-style view
- Mood visual feedback (emoji / color scale)


### July 25
**Focus**: Journal Entry Management & Editing Workflow

**Progress**:

- Built JournalIndex page displaying all journal entries

- Added “Update” button per entry to open editable modal form

- Edit modal allows modifying notes and mood before/after; disables date and spell used fields

- Integrated journal entry save & update handlers in App.jsx for global state management

- Fixed routing and prop passing to enable seamless navigation between SpellBook and JournalIndex

- Added fade animations and modal transitions for improved UX

**Next**:

- Implement persistent storage for journal entries (localStorage or backend)

- Add search and filter functionality on journal entries page

- Refine UI/UX for journal editing modal

- Explore adding calendar or timeline view for journal notes visualization