import { useState } from "react";
import { MessageSquare, ThumbsUp, Reply, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

type Comment = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
};

type Post = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: Comment[];
  time: string;
};

const initialPosts: Post[] = [
  {
    id: "1",
    author: "Sarah M.",
    avatar: "SM",
    content: "Bisakah seseorang menjelaskan bagaimana fotosintesis bekerja? Saya kesulitan memahami prosesnya.",
    likes: 12,
    comments: [
      {
        id: "c1",
        author: "John D.",
        avatar: "JD",
        content: "Fotosintesis adalah proses di mana tumbuhan mengubah cahaya matahari menjadi energi. Mereka menggunakan CO2 dan air untuk membuat glukosa.",
        time: "1 jam yang lalu"
      },
      {
        id: "c2",
        author: "Maria K.",
        avatar: "MK",
        content: "Untuk memudahkan, ingat: Cahaya + Air + CO2 = Glukosa + Oksigen. Klorofil di daun adalah kuncinya!",
        time: "45 menit yang lalu"
      }
    ],
    time: "2 jam yang lalu",
  },
  {
    id: "2",
    author: "Alex K.",
    avatar: "AK",
    content: "Baru saja menyelesaikan PR matematika saya menggunakan fitur Pathly! Sangat membantu untuk pembelajaran adaptif.",
    likes: 24,
    comments: [
      {
        id: "c3",
        author: "Lisa P.",
        avatar: "LP",
        content: "Setuju! Pathly benar-benar mengubah cara saya belajar. Fitur adaptifnya luar biasa.",
        time: "3 jam yang lalu"
      }
    ],
    time: "5 jam yang lalu",
  },
  {
    id: "3",
    author: "Jamie L.",
    avatar: "JL",
    content: "Apakah ada yang punya tips untuk menulis esai yang lebih baik? Saya kesulitan dengan pengorganisasian.",
    likes: 8,
    comments: [],
    time: "1 hari yang lalu",
  },
];

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: "Anda",
      avatar: "AN",
      content: newPost,
      likes: 0,
      comments: [],
      time: "Baru saja",
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const toggleComments = (postId: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const handleReply = (postId: string) => {
    if (!replyContent.trim()) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: "Anda",
      avatar: "AN",
      content: replyContent,
      time: "Baru saja"
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    setReplyContent("");
    setReplyingTo(null);
    
    // Auto-expand comments after reply
    const newExpanded = new Set(expandedPosts);
    newExpanded.add(postId);
    setExpandedPosts(newExpanded);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">EchoForum</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Terhubung, berdiskusi, dan belajar bersama
          </p>
        </div>

        {/* Create Post */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Buat Postingan</h2>
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Bagikan pikiran Anda, ajukan pertanyaan, atau mulai diskusi..."
            className="mb-4 min-h-[100px] text-base md:text-lg"
          />
          <Button onClick={handleCreatePost} className="bg-primary">
            <Send className="w-4 h-4 mr-2" />
            Posting
          </Button>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 card-hover">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 md:w-12 md:h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold">{post.author}</h3>
                      <span className="text-sm text-muted-foreground">• {post.time}</span>
                    </div>

                    <p className="text-base md:text-lg mb-4 leading-relaxed">{post.content}</p>

                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        {post.likes} Suka
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComments(post.id)}
                        className="text-muted-foreground hover:text-secondary"
                      >
                        {expandedPosts.has(post.id) ? (
                          <ChevronUp className="w-4 h-4 mr-2" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mr-2" />
                        )}
                        {post.comments.length} Komentar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                        className="text-muted-foreground hover:text-accent"
                      >
                        <Reply className="w-4 h-4 mr-2" />
                        Balas
                      </Button>
                    </div>

                    {/* Reply Input */}
                    <AnimatePresence>
                      {replyingTo === post.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4"
                        >
                          <Textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Tulis komentar Anda..."
                            className="mb-2 min-h-[80px]"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleReply(post.id)}
                              size="sm"
                              className="bg-secondary"
                            >
                              <Send className="w-3 h-3 mr-2" />
                              Kirim Komentar
                            </Button>
                            <Button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent("");
                              }}
                              size="sm"
                              variant="outline"
                            >
                              Batal
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {expandedPosts.has(post.id) && post.comments.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-3 border-l-2 border-muted pl-4"
                        >
                          {post.comments.map((comment) => (
                            <motion.div
                              key={comment.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex gap-3"
                            >
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                                  {comment.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-sm">{comment.author}</h4>
                                  <span className="text-xs text-muted-foreground">• {comment.time}</span>
                                </div>
                                <p className="text-sm leading-relaxed">{comment.content}</p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Accessibility Notice */}
        <Card className="p-6 mt-6 bg-accent/10 border-accent/30">
          <div className="flex gap-3">
            <MessageSquare className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">Fitur Forum yang Aksesibel</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Dukungan teks besar untuk keterbacaan yang lebih baik</li>
                <li>• Catatan suara untuk respon audio</li>
                <li>• Pembuatan subtitle otomatis</li>
                <li>• Kompatibel dengan pembaca layar</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
