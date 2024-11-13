**Given your inputs, what are the steps necessary to return the desired output?**

1.  I need to create a new react project. How do I do so?

    1.1. Follow the guide from React docs to set up the project env.

2.  I need to think about the project in terms of all the components it can have.

    2.1. One form component to add name, email and phone number.

    2.2. One form component to add education information such as school name, title of study, and date of study.

    2.3. One form component to add Work Experience such as company name, place, position, main responsibilities of job, date from and until when you worked for that company.

3.  What functionalities should each form component have?

    3.1. First things first, there are two UI versions for each component. One is the form version, other is the Resume version. Which version should be served up depends on the state the component is in.

        3.1.1. Hold on, I can actually turn this into a state to determine which UI version is being served up currently. Use a state variable called displayState which holds either “form” or “resume”. Have “form” take the default value.


        3.1.2. Then using a simple if condition, you can choose which JSX to serve up.


        3.1.3. if the displayState equals “form”, then in that if condition, serve up the form JSX for entering values.


        3.1.4. if the displayState equals “resume”, then in that if condition, serve up the JSX (with the info entered into the form) in a resume-like format.

    3.2. Let each component have the respective form info as states.

    3.3. Each form section should contain a submit button.

        3.3.1. Upon clicking the submit button, a handleSubmit() function should fire.


        3.3.2. It simply updates the displayState to “resume”. The if condition for displayState === "resume" will take care of the rest.

    3.4. Each section should have an edit button.

        3.4.1. The edit button should allow to edit the components after they render. The component should display the edit button on the right corner upon mouse hover.


        3.4.2. When the edit button is pressed, it should display the form again. How do I accomplish this?

            i) Create a handleEdit() function that switches the displayState to “form”. The form JSX should get served up now.

            ii) Create a controlled component. Add the info state variables as the values for the input tags.

            iii) Also, each input’s onChange argument should call the state setter through an anonymous function for that particular info variable. This logic will allow the state variables to be updated live, right as the user enters the value for the input in the form.

    3.5. Create additional mini-components that will be created if user wants to add more educational experiences than just one. Do the same thing for work experience section.

        3.5.1. How do I accomplish this? It’s actually simple.

            i) For the component itself, just combine the relevant inputs into a form component.

            ii) Create a state which is an array to keep track of the components.

            iii) Create a ‘+’ or add button in the form JSX which the user can click to add an additional section of the respective experience.

            iv) Upon clicking that button, a new component will be added to the array. Since that updates the state, the new form component will be rendered.

            v) Code the render logic for the components such that new components when added will render automatically.

    3.6. After you’re done with each component, import them into a main parent component and pass them into its return statement. Call it Resume. This component will combine them seamlessly and the styling of this component should make the whole thing look like a professional resume.

    3.7. First, worry about getting the logic to work and displaying everything correctly before worrying about making it look pretty. Once you get one component to work. You can follow the exact same overall logic for the other two.

4.  Create a components directory under src to store your components. How will each component work?

    4.1. WORK component:

        4.1.1. How do I add a role under roles?

            i) You can do it by using a function for the button.

            ii) Display each of the roles below the form right after adding them.

            iii) Add an edit button and a delete button to each of the roles.


        4.1.2. How will the edit button work?

            i) It will call a function editRole(index) function.

            ii) The function will use the index of that particular role item to fetch its value from roles array and assign it to the role input so that it can be edited.

            iii) Convert the role state into an object which contains an unique key id. What are all the things that I have to change to make this happen? 1. Change the handleRoleSubmit() function. 2. Change the way the input updates the role state’s value in onChange() 3. Change the way roles are displayed, using unique key as id instead of index

            iv) For the updateRole() function, make it so that it only updates the value if the id of the role matches any of the role item’s id. Otherwise, return the same role item.

            v) For the Update Role button, have it hidden by default using css. Upon pressing Edit Role button, the update role button appears at the top, otherwise it stays hidden.


        4.1.3. How will the delete button work?

            i) It will call the function deleteRole(index)

            ii) This will use the index of the role to compare against the roles array and delete that particular item.

    4.2. TECHNICAL SKILLS Component:

        4.2.1. What states should the component have?

            i) A skills state which is an array to keep track of all the skill groups

            ii) A skillsGroup state which is an object.

            iii) The skillsGroup state will have a skillsType property which carries the name of the group of skills.

            iv) It will also have a skillsList property which is just an empty string. The skills will be entered as a comma-seperated sentence.


        4.2.2. How will the inputs for this component work?

            i) Have one input be the skillsType

            ii) Have other input be the skillsList.

            iii) User can enter both the values. The input's value property will be assigned to the respective property of the skills group object. onChange will update the state using set state.

            iv) Once the user confirms the inputs, he can add it right below the section using the "Add Skills Group" button.

            v) This button will call the addSkillsGroup() function which will add the entire object to the list of skills.

            vi) The skills state will be printed right below the form element.


        4.2.3. What functions will each of the skillsGroup have?

            i) It will have an edit and a delete function.

            ii) You can copy the exact same functionality that roles from the Work component has.

            iii) Only difference would be is that this time, you'll put back 2 values in 2 inputs.

            iv) Update them and you'd have to create an update button as well.

            v) Use the same logic as the Update button from Work component.

4.3. PROJECT Component:

        4.3.1. What states should the component have?

            i) It should only have 2 states.

            ii) one is a projectDetails state which is an object that will hold the projectName, techStack, date and details.

            iii) another is projectDetail which will hold the current detail point from the input.


        4.3.2. How will the inputs for the component work?

            i) Each input will take the respective property from the state projectDetails.

            ii) Each input’s onChange will change the projectDetails state and update the respective property.

            iii) For the details input, it will add the value to the projectDetail state and that will be added to the details array from projectDetails.

            iv) Disable dates after today’s date. Format the entered date as a Month and year combination. Ex: August 2024


        4.3.3. What functions will each of the projectDetail have?

            i) It will have an edit button which will allow to edit that detail

            ii) It will have a delete button that will allow to delete that detail

            iii) For implementing both, you can refactor the code from Work.jsx


        4.3.4. How would the buttons change during the entire interaction with the Project component?

            i) Add project button disappears while the form of a project component is active.

            ii) Add project button disappears while the edit mode of a project component is active.

            iii) Add project button reappears upon deleting a project

4.4. EDUCATION Component:

        4.4.1. What states should the component have?

            i) Only one state educationDetails which is an object that contains the school, place, titleStudy, startDateStudy, endDateStudy, completedStudy properties.


        4.4.2. How will the inputs for the components work?

            i) Exact same logic for the inputs from the previous component except for one difference.

            ii) Create a checkbox input with name: Completed Study?

            iii) If checked, then the startDateStudy & endDateStudy input will appear.

            iv) If unchecked, then only date input endDateStudy shows up with the label “Expected Graduation year”

            v) Submission of the form should properly set the correct dates in the object.

5.  Create a styles directory under src as well to store your CSS files.

    5.1. Create a CSS file for each of the components.

    5.2. I’d have to import the css files for each of the components to apply the styles.

6.  LOCAL STORAGE: Read an article on how to use react with localStorage.

    6.1. Why should I use localStorage?

    It will save all the data of the resume on refresh and revisit

    6.2. How would I implement localStorage to store resume details on page reload?

    You will make use of useEffect hook which will simply store the state to localStorage every time the state is updated

        6.2.1. PRE-CONDITIONS TO MEET:

            i) I would split the components and have one component display the forms and have the other component display the resume. Get rid of the displayState state for the components.

            ii) I would also refactor all the components to use only one state which is an object that contains all the details.

            iii) Also, make the parent component contain the forms for the child components. The edit and delete buttons will simply be passed into the child components as a reference. This will avoid all the form duplication, keep only one form for updation.

            iv) How can you accomplish this behaviour? Just pass in the id of the component in with the edit button, the parent’s editComponent() function will display the needed form with all the correct values and the update button whose updateComponent() function will update the component elements using the stored array which contains the object with the same id. Remember all the data is stored in the parent component itself.


        6.2.2. LOCALSTORAGE IMPLEMENTATION STEPS:

            i) Store the array state variable’s values in localStorage using useEffect() method.

            ii) Track the array state in it by using localStorage.setItem() with JSON.stringify() to store the state’s data everytime it get’s updated.

            iii) Then, use localStorage.getItem() with JSON.parse() to retrieve the stored data and store that in a const variable.

            iv) Then simply initialize the array state that stores all the objects with that const variable from localStorage.

            v) This creates a cycle where form data gets added to localStorage because it updates the array state on form submit which triggers the useEffect() and the array state is initialized with the same localStorage data. So the data doesn’t get lost on refresh or double render.

7.  React-pdf: Check out their docs, everything you need to create the resume is there.

    7.1. Why should I use React-pdf?

        i) You wanna be able to download the resume you make in the application.

        ii) To do so, you have to convert it to a PDF document.

    7.2. How would I implement React-pdf?

        7.2.1 Create an HTML version of the Resume using appData.

            i) Make sure to only use styles that are supported by React-pdf.

            ii) Refer to Styling page from the documentation.

            iii) This is important because pdf creation is a resource-consuming process that should only be carried out when the user wants to download the resume. The HTML version should serve the purpose of giving the user a preview of the resume they’re making.


        7.2.2. After HTML version of Resume is complete, do this:

            i) Port the styles you used for the HTML version into StyleSheet.create() function.

            ii) All the styles for an element should be written in camelCase format and stored in one object. The elementName and it’s styles object will then be stored as a key-value pair inside one overall object.


        7.2.3. Create the document component:

            i) Use View tags for each of the Resume sections.

            ii) Retrieve all the resume values from localStorage().

            iii) Pass those values in curly braces to the View tags. This will allow to update the pdf with the latest values dynamically.


        7.2.4. Download the pdf:

            i) Create a component for this.

            ii) Use “usePDF” hook to get the instance variable which contains the rendered PDF.

            iii) Then you can download the PDF by using instance.url as the download link in an href attribute and download attribute set in an anchor tag. You can style the anchor tag to look like a button if you so choose.

        Let’s go!

8.  I think I’ll go forward with Vercel for deploying the project. If that doesn’t work out, then try netlify and then cloudfare if that fails.

9.  BUGS TO FIX:

    i) For technicalSkills, WorkSection, and ProjectSection component refactor the deleteRole/deleteSkillsGroup/deleteDetail functions such that the update button only gets hidden if there’s only one of the role/skillsgroup/detail available in the array. The reason is the update button doesn’t have to disappear when other items of the same type are being deleted. It only has to disappear if the only available item got deleted. Also reset the individual item-storing state only when there’s only one element. - FIXED

10. COMMON COMPONENT FEATURES TO ADD:

    10.1. Create a state “limit”: DONE

        i) It tracks the maximum number of components that a section can have.

        ii) What’s the need for this? You have to ensure the form only displays when the component nos. is lesser than the maximum limit. If it’s greater, then upon pressing add component button, instead of displaying the form, it will display a message reading “Component limit reached!”

        iii) So inside the addComponent() function, use the limit state to display the appropriate element. Both elements will exist in the returned jsx but only one will get rendered.

        iv) The other way to do it would be to put both the form and the message div inside another div and display that div normally as you would but inside it use a conditional operator to display the form if array length is less than limit or the message div if it isn’t. This may be arguably simpler.

        v) Either way wait till you have implemented localStorage before implementing this feature coz it's impossible to do this now due to data loss on double rendering.

    10.2. Add a cancel button to the forms of all the components:

        i) The cancel button should reset the currentData holding state (not for General)

        ii) Display the Add Component button.

        iii) It should also hide the form as well.

    10.3. Replace all DOM references with useRef() hook variables

        i) Currently, all DOM references are done the same way its done in Vanilla JS by using document.querySelector() or document.getElementById().

        ii) Refactor it to use “useRef()” hook variables instead.

        iii) Why do this? The correct way to reference DOM nodes in react is by using useRef() hooks. This is a great oppurtunity to practice the convention and get used to it!

    10.4. Disable dates after today in date-picker:

        i) For Project component, disable dates after today’s date for the date input. Reason: One cannot include a project that they haven’t finished yet.

        ii) For Work component, when stillWorking is false, disable the dates after today’s date for both the date inputs. Reason: One cannot be working in the same position after today if they’re not currently working in that position anymore.

        iii) For Education component, when completedStudy is true, disable the dates after today’s date for both the date inputs. Reason: One cannot be studying the same course after today if they’re not currently studying anymore.

    10.5. Format dates into month and year for all the components:

        i) Use dateVar.getMonth() and array with month short-form names to fetch the Month from the date.

        ii) Use dateVar.getFullYear() to get the full year from the date. You can use just that.

        iii) The dates themselves can be stored as they are but format them while displaying them.

    10.6. Add bold/italic styling capability for the component's roles/details:

        i) Add a feature that allows the user to make text bold by adding a ‘\*’ behind that word and italic by adding ‘\_’ behind that word.

        ii) Use string.split(‘ ‘) to split the sentence by words.

        iii) Use array.map() and string.startsWith(‘\*’) to check for the words that are supposed to be made bold and return that word enclosed in b tags if it matches, otherwise return that word normally.

        iv) Use array.map() and string.startsWith(‘\_’) to check for the words that are supposed to be made italic and return that word enclosed in i tags if it matches, otherwise return that word normally.

        v) Then you can use array.join(“ “) to rejoin the words into a full sentence.

    10.7. Refactor form display/hide logic to use a transition:

        i) Create a formVisible state and set it to false by default.

        ii) Change all code lines where form’s display is none to formVisible false and where form’s display is flex to formVisible true.

        iii) Add a class closed to form by default and use max-height and transition properties to create the transition when the closed is not active.

11. UI:

    11.1. SIDEBAR Component: This component holds all the form components. Styling for the entire section can be handled in this component if you so choose.

        11.1.1. How would each component section be styled?

            i) There's a header div which contains a h1 and a button which can be used to expand a dropdown.

            ii) Then below that is a component-main div which is the area that will be expanded upon clicking the expand button.

            iii) Main content will contain all the components functions.

            iv) Use animations for the dropdown of the form and for the expand button.

            v) Style the individual preview components in their own CSS files.

    11.2. HEADER Component:

        11.2.1. What are all the elements that the component contains?

            i) Has the logo of the application.

            ii) Has a “Load Dummy” button.

            iii) Has a “Clear Resume” button.

            iv) Has a “Download Resume” button.


        11.2.2. What functions will each of the elements have?

            i) Logo serves to let users know what the application is.

            ii) “Load Dummy” button clears the localStorage and loads a dummy resume. You can do this by manually defining values for the resume sections, storing it in localStorage() under the component “key” names. Everything should automatically update in both the sidebar and the rendered pdf. For general component, make sure to set the formSubmitted value to true.

            iii) “Clear Resume” button clears the entire resume and makes it empty. Use the clear() function of localStorage to achieve this. Display a modal that warns the user that the entire resume will be reset.

            iv) “Download Resume” button will allow to download the rendered pdf created using React-pdf.


        11.2.3. How would the Header component be styled?

            i) I need to find a logo svg and a font for my logo.

            ii) I need to find a font for the other buttons.

            iii) The logo and the app name will be in one div and the other 3 buttons will be in another div.

            iv) Use flex and space-between/space-around to achieve the header layout.

            v) Fix the header at the top of the page.

    11.3. RESUME Component:

        11.3.1. What elements will the component contain?

            i) It will contiain one resume div.

            ii) This div will have each of the resume components in the right order.


        11.3.2. How will the component get its display values?

            i) Create array states for each of the component's data.

            ii) Initialize the array with the respective data array from localStorage.

            iii) This way whatever updates the component forms do to the data arrays, that same update will be reflected in the resume component.


        11.3.3. How should each of the Resume components be styled?

            i) Style the resume look of the components one at a time, starting at the top.

            ii) Use the template resume you have as reference to format the rendered text and style each of the sections.


        11.3.4. GeneralResume Component:

            i) Make the name property an H1 element.

            ii) Create a para tag for the rest of the elements. Put all of the other props in that tag separated by "|"s. Add display: block; to this element coz you want the entire para to be on a single line

            iii) Put the props that are links inside span elements and add a common class to them that you can use to underline them.


        11.3.5. EducationResume Component

            i) Add an h2 tag which contains the text "Education"

            ii) Add a hr tag for the line beneath Education, if that doesn't work correctly, simply create a div, make it's height really short, width 100% and background color black.

            iii) University and placeStudy should be in the same div with a p tag for each. Use flex and space-between to separate them. Put university in b tags for bold.

            iv) Put titleStudy and GPA in the same para enclosed in i tags for italic and put just the GPA in b tags for bold. Put completed dates or expected graduation year in p tag. Put both the above p tags in the same div and simply use flex and space-between again.

            v) This styling should get repeated for all the education data in the array coz you'll be doing all this inside that array's map().


        11.3.6. TechnicalSkillsResume Component

            i) Add an h2 tag which contains the text "Technical Skills"

            ii) Add the same hr tag beneath this text as well.

            iii) Just create list items with the objects. Hide the bullets for the items using css. Thats it.


        11.3.7. ExperienceResume Component

            i) and ii) Same as the 2 components before

            iii) Put the position and work dates in their own p tags and group them in a div and use flex and space-between.

            iv) Put the company and place in their p tags and in a div with same styles as before.

            v) Create a ul and make each of the roles a li item.

            vi) Follow this design for each of the work data objects using array.map()


        11.3.8. ProjectsResume Component

            i) and ii) same as other comps

            iii) Put the projectName and the techStack in the same para. Put the date in another para. Put them both in same div and use flex and space-between.

            iv) Create a ul for the project details with li tags for each detail

            v) Follow this style for each of the project data objects using map().
