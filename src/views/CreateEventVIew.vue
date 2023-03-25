<template>
    <div class="ml-10">

        <FormKit type="form" submit-label="Create Event" @submit="createEvent">
            <FormKit validation="required" name="title" type="text" label="Event Title" value="" help="Pick a catchy event name!" />
            <FormKit name="datetime" type="datetime-local" value="" label="Event Date and Time"
                help="When will your event take place?" validation="required" validation-visibility="live" />
            <FormKit name="details" type="textarea" label="Details" rows="10" placeholder="What to expect?"
                help="Tell more about the event" />
            <FormKit name="image" type="file" label="Event Image" accept=".jpg, .png" help="Upload an image for your event"
                multiple="false" />
        </FormKit>
    </div>
</template>

<script setup>
const createEvent = (data) => {
    console.log(data)
    const body = new FormData();
    body.append('title', data.title);
    body.append('datetime', data.datetime);
    body.append('details', data.details);
    body.append('image', data.file);
    console.log(body.values());
}
</script>

<style scoped></style>