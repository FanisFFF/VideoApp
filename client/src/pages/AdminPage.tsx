import { usePostVideoMutation } from "@/api/videoApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function AdminPage() {
    const [postVideo, { isLoading, isError, error, isSuccess }] = usePostVideoMutation();
    const [formData, setFormData] = useState({
        'title': '',
        'description': '',
        'video': null as File | null,
        'thumbnail': null as File | null
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formData.video) return;

        const postData = new FormData();
        postData.append("title", formData.title);
        postData.append("description", formData.description);
        postData.append("video", formData.video);
        if (formData.thumbnail) postData.append('thumbnail', formData.thumbnail);
        await postVideo(postData);
        setFormData({ title: "", description: "", video: null, thumbnail: null });
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                    <Label className="mb-2">Video File:</Label>
                    <Input
                        required
                        onChange={(e) => setFormData({ ...formData, video: e.target.files?.[0] || null })}
                        name="file"
                        type="file"
                    />
                </div>
                <div >
                    <Label className="mb-2">Video Thumbnail:</Label>
                    <Input
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })}
                        name="thumbnail"
                        type="file"
                    />
                </div>
                <div>
                    <Label className="mb-2">Video Title:</Label>
                    <Input
                        value={formData.title}
                        required
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        type="text"
                    />
                </div>
                <div>
                    <Label className="mb-2">Video Description</Label>
                    <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter video description" />
                </div>
                <Button type="submit">Submit</Button>
            </form>
            {isLoading && <p>Uploading...</p>}
            {isError && (
                <p className="text-red-400">
                    {"status" in error
                        ? (error.data as any)?.message || "Upload failed"
                        : "An unexpected error occurred."}
                </p>
            )}

            {isSuccess && <p className="text-green-400">Video uploaded successfully!</p>}
        </div>
    );
}

export default AdminPage;