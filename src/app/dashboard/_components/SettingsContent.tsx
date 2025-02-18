import React from 'react';

const SettingsContent = () => {
    return (
        <div className="space-y-8 p-6">
            {/* Learning Path Settings */}
            <div className="bg-white rounded-lg p-6 shadow">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Learning Path</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Career Goals</label>
                            <select className="w-full p-2 border rounded">
                                <option>Full Stack Development</option>
                                <option>Frontend Development</option>
                                <option>Backend Development</option>
                                <option>Mobile Development</option>
                                <option>Data Science</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Skill Level</label>
                            <select className="w-full p-2 border rounded">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4" />
                                <span>Enable personalized course recommendations</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Study Preferences */}
            <div className="bg-white rounded-lg p-6 shadow">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Study Preferences</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Preferred Learning Style</label>
                            <select className="w-full p-2 border rounded">
                                <option>Video Lectures</option>
                                <option>Interactive Coding</option>
                                <option>Text-based Tutorials</option>
                                <option>Project-based Learning</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Content Difficulty</label>
                            <select className="w-full p-2 border rounded">
                                <option>Show All Levels</option>
                                <option>Match My Level Only</option>
                                <option>Challenge Me (Slightly Above)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Display Settings */}
            <div className="bg-white rounded-lg p-6 shadow">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Course Display</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Default Course View</label>
                            <select className="w-full p-2 border rounded">
                                <option>Grid View</option>
                                <option>List View</option>
                                <option>Compact View</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4" />
                                <span>Show course progress bars</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4" />
                                <span>Show estimated time remaining</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Study Schedule */}
            <div className="bg-white rounded-lg p-6 shadow">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Study Schedule</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Weekly Study Goal</label>
                            <select className="w-full p-2 border rounded">
                                <option>5 hours/week</option>
                                <option>10 hours/week</option>
                                <option>15 hours/week</option>
                                <option>20 hours/week</option>
                                <option>Custom</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4" />
                                <span>Enable study reminders</span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Preferred Study Time</label>
                            <select className="w-full p-2 border rounded">
                                <option>Morning (6AM - 12PM)</option>
                                <option>Afternoon (12PM - 5PM)</option>
                                <option>Evening (5PM - 10PM)</option>
                                <option>Custom Schedule</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsContent;