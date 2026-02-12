import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useUser } from "@clerk/clerk-react";
import { Trash2, Send, History, Sparkles, Loader2 } from "lucide-react";

import { generateRoadmap, getRoadmapHistory, deleteRoadmap, deleteAllRoadmaps } from "../api/roadmapApi";

const RoadmapGenerator = () => {
  const { user } = useUser();

  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const [roadmap, setRoadmap] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);

  const userId = user?.id;
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Fetch history
  const fetchHistory = async () => {
    if (!userId) return;
    try {
      const data = await getRoadmapHistory(userId);
      setHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  // Generate roadmap
  const handleGenerate = async () => {
    if (!topic.trim()) return;

    try {
      setLoading(true);
      setRoadmap("");

      const data = await generateRoadmap({
        userId,
        userEmail,
        topic,
        goal,
      });

      setRoadmap(data.chat.roadmap);
      setTopic("");
      setGoal("");
      setSelectedRoadmapId(data.chat._id);
      fetchHistory();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete one roadmap
  const handleDeleteOne = async (chatId) => {
    try {
      await deleteRoadmap(chatId);
      if (selectedRoadmapId === chatId) {
        setRoadmap("");
        setSelectedRoadmapId(null);
      }
      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete all roadmaps
  const handleDeleteAll = async () => {
    if (!userId) return;

    const confirmDelete = window.confirm("Delete all roadmap history?");
    if (!confirmDelete) return;

    try {
      await deleteAllRoadmaps(userId);
      setHistory([]);
      setRoadmap("");
      setSelectedRoadmapId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewRoadmap = (item) => {
    setRoadmap(item.roadmap);
    setSelectedRoadmapId(item._id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-4">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">AI-Powered Learning Paths</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            Roadmap<span className="text-blue-600">.ai</span>
          </h1>
          <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto">
            Transform your career goals into structured, actionable learning roadmaps in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Card */}
            <div className="bg-white rounded-2xl border border-slate-200/75 shadow-lg shadow-blue-500/5">
              <div className="p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-slate-900 mb-1">
                      Create New Roadmap
                    </h2>
                    <p className="text-sm text-slate-500">
                      What would you like to learn or achieve?
                    </p>
                  </div>
                </div>

                {/* Inputs */}
                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Full Stack Developer, Data Science, UX Design"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Optional: Your specific goal (e.g., Get a job at Google, Build a startup)"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                    className="w-full relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 group-hover:opacity-90 transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-2 px-4 py-3.5 text-white font-medium">
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Generating your roadmap...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Generate Roadmap</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Output Card */}
            <div className="bg-white rounded-2xl border border-slate-200/75 shadow-lg shadow-blue-500/5">
              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Sparkles size={16} className="text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Generated Roadmap
                    </h2>
                  </div>
                  {roadmap && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                      Latest
                    </span>
                  )}
                </div>

                <div className="relative">
                  {loading ? (
                    <div className="min-h-[400px] flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-slate-200">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-slate-600 font-medium">
                        Crafting your personalized roadmap...
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        This may take a few seconds
                      </p>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none min-h-[400px] max-h-[600px] overflow-auto bg-slate-50/50 rounded-xl p-6 border border-slate-200">
                      {roadmap ? (
                        <ReactMarkdown
                          components={{
                            h1: ({ ...props }) => (
                              <h1 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200" {...props} />
                            ),
                            h2: ({ ...props }) => (
                              <h2 className="text-xl font-semibold text-slate-800 mb-3 mt-6" {...props} />
                            ),
                            h3: ({ ...props }) => (
                              <h3 className="text-lg font-medium text-slate-800 mb-2 mt-4" {...props} />
                            ),
                            p: ({ ...props }) => (
                              <p className="text-slate-600 leading-relaxed mb-4" {...props} />
                            ),
                            ul: ({ ...props }) => (
                              <ul className="list-disc pl-4 space-y-2 mb-4" {...props} />
                            ),
                            ol: ({ ...props }) => (
                              <ol className="list-decimal pl-4 space-y-2 mb-4" {...props} />
                            ),
                            li: ({ ...props }) => (
                              <li className="text-slate-600" {...props} />
                            ),
                            code: ({ ...props }) => (
                              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 border border-slate-200" {...props} />
                            ),
                            pre: ({ ...props }) => (
                              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm" {...props} />
                            ),
                          }}
                        >
                          {roadmap}
                        </ReactMarkdown>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center py-12">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                            <Sparkles size={32} className="text-blue-600" />
                          </div>
                          <p className="text-slate-700 font-medium">
                            No roadmap generated yet
                          </p>
                          <p className="text-sm text-slate-400 mt-1 text-center max-w-xs">
                            Enter a topic above and click generate to create your personalized learning path
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200/75 shadow-lg shadow-blue-500/5 sticky top-6">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <History size={16} className="text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      History
                    </h2>
                  </div>

                  {history.length > 0 && (
                    <button
                      onClick={handleDeleteAll}
                      className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 size={14} />
                      Clear all
                    </button>
                  )}
                </div>

                <div className="mt-5">
                  {history.length === 0 ? (
                    <div className="bg-slate-50/50 rounded-xl p-8 text-center border border-slate-200">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <History size={20} className="text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">No history yet</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Your generated roadmaps will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                      {history.map((item) => (
                        <div
                          key={item._id}
                          className={`group relative bg-white border rounded-xl p-4 transition-all hover:shadow-md ${
                            selectedRoadmapId === item._id
                              ? "border-blue-500 bg-blue-50/30"
                              : "border-slate-200 hover:border-blue-200"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm text-slate-900 truncate">
                                {item.topic}
                              </h3>
                              <p className="text-xs text-slate-400 mt-1">
                                {new Date(item.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>

                            <button
                              onClick={() => handleDeleteOne(item._id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => handleViewRoadmap(item)}
                            className={`mt-3 text-xs font-medium transition-colors ${
                              selectedRoadmapId === item._id
                                ? "text-blue-600"
                                : "text-slate-500 hover:text-blue-600"
                            }`}
                          >
                            View Roadmap →
                          </button>

                          {selectedRoadmapId === item._id && (
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default RoadmapGenerator;