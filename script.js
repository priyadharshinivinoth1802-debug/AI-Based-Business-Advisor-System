const form = document.getElementById("businessForm");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const submitButton =
    document.getElementById("submitButton");

const successScreen =
    document.getElementById("successScreen");

const anotherButton =
    document.getElementById("anotherButton");

const problem =
    document.getElementById("businessProblem");

const goal =
    document.getElementById("businessGoal");

const problemCount =
    document.getElementById("problemCount");

const goalCount =
    document.getElementById("goalCount");


/* ================================
   FORM FIELDS
================================ */

const fields = form.querySelectorAll(
    "input, select, textarea"
);


/* ================================
   PROGRESS
================================ */

function updateProgress() {

    let completed = 0;

    fields.forEach(function(field) {

        if (
            field.value.trim() !== ""
        ) {
            completed++;
        }

    });

    const percentage = Math.round(
        (completed / fields.length) * 100
    );

    progressBar.style.width =
        percentage + "%";

    progressText.textContent =
        percentage + "%";
}


fields.forEach(function(field) {

    field.addEventListener(
        "input",
        updateProgress
    );

    field.addEventListener(
        "change",
        updateProgress
    );

});


/* ================================
   CHARACTER COUNTERS
================================ */

problem.addEventListener(
    "input",
    function() {

        problemCount.textContent =
            problem.value.length;

    }
);


goal.addEventListener(
    "input",
    function() {

        goalCount.textContent =
            goal.value.length;

    }
);


/* ================================
   SUBMIT
================================ */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }


        submitButton.disabled = true;

        submitButton.innerHTML =
            "Submitting...";


        /*
         * Demo submission.
         *
         * Replace this setTimeout with
         * fetch() when connecting a backend.
         */

        setTimeout(function() {

            form.style.display = "none";

            successScreen.classList.add(
                "show"
            );

            successScreen.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            submitButton.disabled = false;

        }, 1200);

    }
);


/* ================================
   SUBMIT ANOTHER RESPONSE
================================ */

anotherButton.addEventListener(
    "click",
    function() {

        form.reset();

        problemCount.textContent = "0";

        goalCount.textContent = "0";

        progressBar.style.width = "0%";

        progressText.textContent = "0%";

        successScreen.classList.remove(
            "show"
        );

        form.style.display = "block";

        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* Initial state */

updateProgress();