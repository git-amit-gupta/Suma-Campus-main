# Project Overview:

- [Screenshot Drive link](https://drive.google.com/drive/folders/1pihskMKCLY_HHpwhuzc_VK6tbdyIu4ZU)

- [Live URL](https://suma-campus.vercel.app/login)


SUMA CAMPUS [Suma - means 'Just for fun' in my mother tongue Tamil] is a platform designed to help students connect with foreign universities. The admin dashboard allows administrators to manage universities, courses, fees, eligibility criteria, and student information. Students can register via a mobile app, and admins can track their visa status, course selections, and update their progress.

## Project Setup

To run the project locally:

## Install dependencies:

```bash
npm install
```

or (if needed):

```bash
npm i --force
```

Start the development server:

```bash
npm run dev
```

Access the app at:

```bash

http://localhost:3000
```

Start the development server:

```bash
npm run build
```

## Technologies Used

- Frontend Framework: Next.js, React.js

- UI Components: Sencha ReExt

- Backend Integration: Firebase (Free Plan)

- Third-Party Libraries:

        moment-timezone: For global time management

        react-stepper-js: For step tracking

## Custom Hooks:

- useMediaQuery: For responsive design

- useClickOutside: For tracking mouse events

## Global Context:

- For managing global time and UI themes (normal/black).

## Folder Structure

Here’s a suggested folder structure for your project:

```bash
/
├── public/                        # Static assets (images, etc.)
|   ├── custom/                    # Ext JS Custom Component
|   ├── images/                    # Images Folder
|   └── ReExt/
├── app/
|   ├── common/
|   |   ├── hooks                  # Custom hooks (useMediaQuery, useClickOutside)
|   |   ├── Modal
|   |   ├── ButtonField
|   |   └── ...otherFiles
│   ├── components/                # Dashboard Components
│   ├── context/                   # Global context
|   ├── downloads/                 # Simulator for Active users
│   ├── login/                     # Login context
│   ├── register/                  # Register context
│   ├── pages/                     # Next.js main page
│   ├── layout/                    # Next.js main layout page
│   │   ├── campus/                # Campus-related routes
│   │   │   ├── dashboard/         # /campus/dashboard
│   │   │   ├── profile/           # /campus/profile
│   │   │   ├── realtimeusers/     # /campus/realtimeusers
│   │   │   ├── referral/          # /campus/referral
│   │   │   ├── students/          # /campus/students
│   │   │   ├── university/        # /campus/university
│   │   │   ├──layout/             # /ReExt Configuration
│   │   │   └── page/              # /Main Index page
│   │   └──downloads.js            # /downloads
│   └── styles/                    # Global styles
│── firebase/                      # Firebase configuration and services
```

## Routes

Here’s a list of all the routes in your project:

1. / or /login - Login page

2. /register - Registration page

3. /campus/university - University list

4. /campus/university/add - Add a new university

5. /campus/university/view - View university details

6. /campus/students - Students list

7. /campus/students/add - Add a new student

8. /campus/students/view - View student details

9. /campus/referral - Referral information

10. /campus/profile - Admin profile

11. /downloads - Downloads page

## Custom Components

I’ve developed the following custom components:

- SumaList.jsx: Table for University/Students

- SumaMobileList.jsx: Mobile-friendly table for University/Students

- GridController: Controller for University/Students tables

- ActiveAdminList: Displays active admins on the dashboard

- ActiveAdminController: Controller for ActiveAdminList

- RealtimeChart: Displays real-time active users

- RealtimeController: Controller for RealtimeChart

## Screenshots

[Flow Diagram link](https://www.canva.com/design/DAGdxNOnyl8/WXXekHWMon5gYOBa5Ng5bA/edit?utm_content=DAGdxNOnyl8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

![Flow Diagram](https://drive.google.com/uc?export=view&id=1BZlMUHWzWbCYW0iXBrjXptj2u_NTtmkQ)

<!-- ![Firebase](https://drive.google.com/uc?export=view&id=1578AOSCijnHoMJmeAjhWOuYMuhcsCqsx) -->

![Firebase](https://drive.google.com/file/d/1O3FJZ1oETorJS7PlzB5O8Yg5GyTDv1LV/view?usp=drive_link)

![Firebase](https://drive.google.com/file/d/17um-D_qTMymxQPkHXan2jlusHb5H_BI9/view?usp=drive_link)

![Firebase](https://drive.google.com/file/d/1P7hovrUZgsdzmpPDMUcpK9WVbnjFqlPe/view?usp=drive_link)

![Firebase](https://drive.google.com/file/d/10IwHzqkilVoJM2dvvDCS7QHfAx6cDyhh/view?usp=drive_link)

<!-- [Screeshots](https://drive.google.com/drive/folders/1Bj-RPbdeLATfg1SYilbzulhKXoBMEnnu?usp=drive_link) -->

[Screenshots](https://drive.google.com/drive/folders/1pihskMKCLY_HHpwhuzc_VK6tbdyIu4ZU)

## Note:

- I have used Tailwind like css for some of the component, you can see that in ./global.css
- There's no Ext Panel, which is shown by default.I used css to hide it.
  ```bash
  /* Hide the Ext Panel  */
   .wm {
   display: none !important;
   }
  ```
- Use Low Quality / Low Size images for Uploading Images.
- Firebase API is limited, so use accordingly.
- I have implemented timer, rate limiting for API requests.

---

## Authentication

### Note:

- There's no route based authentication, so you can see every page easily.
- By default username/password is [admin1/admin1] - without any inputs you can click directly Login Button, in Login Page.
- For Register Page, you need to compulsary enter username/password.

| Username | Password |
| -------- | -------- |
| admin1   | admin1   |
| admin2   | admin2   |

---

## Dashboard

### Note:

- Only read API is there for dashboard.
- There's no Submission of data to Database.

---

## University

- You can Add a University
- You can Edit the University
- You can View the University
- You can Delete a University

### Note:

        - Please use low quality, low Size images for Uploading Images

---

## Students

- You can Add a Students
- You can Edit the Students
- You can View the Students
- You can Delete a Students

### Note:

        - Please use low quality, low Size images for Uploading Images

## Active list

- Go to routes /downloads, to trigger the active users.
- It is limited to 30 seconds due to firebase API limitation.
- Can refreshed and use again.
- ![ActiveList](https://drive.google.com/uc?export=view&id=13Duw_jeslgwudGvbk8XEjlH99w6oXuEm)

## SignOut

- Simple Signout functionality.

---

## Sencha ReExt Components

I’ve utilized the following Sencha ReExt components:

- Button

- Display Field

- Accordion

- Forms

- Container

- Image

- Text Field

- Number Field

- Panel

- Tabpanel

- Grid

- Toolbar

- Radio Group

- File Field

- Combobox

- Dataview

- Polar

- Timefield

- Cartesian

## Third-Party Libraries

- [@moment-timezone](https://www.npmjs.com/package/moment-timezone): Integrated with ReExt Dropdown for global time management.

- [@react-stepper-js](https://www.npmjs.com/package/react-stepper-js): Used for tracking the current step in multi-step processes.

## Global Context

- Theme Management: Toggle between normal and black UI themes.

- Global Time: Display and manage time across different time zones.

## NPM Dependencies

- @sencha/reext ^1.0.355
- axios ^1.7.9
- firebase ^11.1.0
- moment-timezone ^0.5.46
- next 15.1.4
- react ^19.0.0
- react-dom ^19.0.0
- react-stepper-js ^1.0.4
- react-loading-skeleton "^3.5.0"
- vercel "^40.1.0"

## Authors

- [@vairavel](https://github.com/Vairavelflash)

## Latest Release v 2.0

### UI Enhancements Summary

- Fonts: Switched to next/font with Inter as the primary typeface.

- Login & Register: Updated background color, hover effects, and added logo; fonts unified to Inter.

- Dashboard: Simplified dashboard, improved bar and pie charts.

- Chart - Error in PIE/BAR Chart is resolved.

- Navigation: Restyled top and side navigation bars.

- Responsive: Made seperate design for Desktop/ Tablet / Mobile devices.

- Inputs/Panels: Applied rounded borders.

- Theme Toggle: Dark mode now fully functional across all views.

- Panels & Cards: Header tag colors adjusted; added shadow effects.

- Skeleton Loader: Included for better UX during data load.

### Latest UI Enchancements

- Referral Add/View/Edit/Delete Done.

- Desktop / Tab / Mobile View Done for referral.

- Stepper form alignment issue solved.


- [Screenshot Drive link](https://drive.google.com/drive/folders/1pihskMKCLY_HHpwhuzc_VK6tbdyIu4ZU)
