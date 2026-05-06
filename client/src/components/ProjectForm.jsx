import React from "react";
import { Plus, Trash2, FolderIcon, GlobeIcon, GitBranch } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {

    
    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
            live_link: "",
            source_code_link: ""
        };
        // Update the form data with the new project
        onChange([...data, newProject]);
    };

    
    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
    <div>
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <FolderIcon className="size-5" />
                    Projects
                </h3>
                <p className="text-sm text-gray-500">Add your projects</p>
            </div>

            <button
                onClick={addProject}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
                <Plus className="size-4" />
                Add Project
            </button>
        </div>

        {/* Project Cards */}
        <div className="space-y-4 mt-4">
            {data.map((project, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">

                    <div className="flex justify-between items-start">
                        <h4 className="font-medium">Project #{index + 1}</h4>
                        <button
                            onClick={() => removeProject(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </div>

                    <input
                        value={project.name || ""}
                        onChange={(e) => updateProject(index, "name", e.target.value)}
                        type="text"
                        placeholder="Project Name"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full"
                    />

                    <input
                        value={project.type || ""}
                        onChange={(e) => updateProject(index, "type", e.target.value)}
                        type="text"
                        placeholder="Project Type (e.g. Web, ML, App)"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full"
                    />

                    <textarea
                        value={project.description || ""}
                        onChange={(e) => updateProject(index, "description", e.target.value)}
                        placeholder="Short Project Description"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full resize-none"
                        rows={3}
                    />

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 focus-within:border-blue-400 focus-within:shadow-sm">
                            <GitBranch className="size-4 text-purple-600" />
                            <input
                                type="text"
                                placeholder="Source code link (optional)"
                                value={project.source_code_link || ""}
                                onChange={(e) => updateProject(index, "source_code_link", e.target.value)}
                                className="flex-1 text-sm border-none outline-none focus:outline-none focus:ring-0 bg-transparent"
                            />
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 focus-within:border-blue-400 focus-within:shadow-sm">
                            <GlobeIcon className="size-4 text-blue-600" />
                            <input
                                type="text"
                                placeholder="Live demo link (optional)"
                                value={project.live_link || ""}
                                onChange={(e) => updateProject(index, "live_link", e.target.value)}
                                className="flex-1 text-sm border-none outline-none focus:outline-none focus:ring-0 bg-transparent"
                            />
                        </div>
                    </div>

                </div>
            ))}   {/* ✅ map closes here */}
        </div>

    </div>
);
};

export default ProjectForm;