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
import { config, storage } from '@/stores/appwriteconfig';
import api from '@/stores/axiosUtils';
const createEvent = async (data) => {
    let newEventId = null;
    const eventData = {
        title: data.title,
        datetime: data.datetime,
        details: data.details,
    };
    try {
        const { data: dbData } = await api.post('/api/events/create', eventData);
        newEventId = dbData.$id;
        const bucketId = config.EVENT_IMAGE_BUCKET_ID;
        const fileData = await storage.createFile(bucketId, newEventId, data.image[0].file);
        const project = config.PROJECT_ID;
        const imageUrl = new URL(`/storage/buckets/${bucketId}/files/${fileData.$id}/preview?project=${project}`, storage.client.config.endpoint).href;
        console.log(eventData, fileData, imageUrl);
    } catch (err) {
        if (newEventId) {
            await api.delete(`/api/events/${newEventId}`);
        }
    }
}
</script>

<style scoped></style>
