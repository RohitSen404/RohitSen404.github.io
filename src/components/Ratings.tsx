import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Rating {
  id: string;
  visitor_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

const Ratings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [name, setName] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    const { data, error } = await supabase
      .from("ratings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      setRatings(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || selectedRating === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("ratings").insert({
      visitor_name: name.trim(),
      rating: selectedRating,
      comment: comment.trim() || null,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thank you!",
        description: "Your rating has been submitted successfully.",
      });
      setName("");
      setSelectedRating(0);
      setComment("");
      fetchRatings();
    }

    setIsSubmitting(false);
  };

  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : "0.0";

  return (
    <section id="ratings" className="relative py-20 px-4 bg-background">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-cyan">
            Rate My Work
          </h2>
          <p className="text-muted-foreground text-lg">
            Share your feedback and see what others think
          </p>
        </div>

        {/* Rating Form */}
        <div className="glass-card p-8 rounded-lg mb-12 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                maxLength={100}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverRating || selectedRating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Comment (Optional)
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                maxLength={500}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Rating"}
            </Button>
          </form>
        </div>

        {/* Average Rating Display */}
        <div className="glass-card p-6 rounded-lg mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-4">
            <div>
              <div className="text-5xl font-bold text-primary">{averageRating}</div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(parseFloat(averageRating))
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-semibold">{ratings.length}</div>
              <div className="text-muted-foreground">
                {ratings.length === 1 ? "Rating" : "Ratings"}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Ratings */}
        {ratings.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Recent Ratings
            </h3>
            {ratings.map((rating) => (
              <div
                key={rating.id}
                className="glass-card p-6 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{rating.visitor_name}</h4>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </span>
                </div>
                {rating.comment && (
                  <p className="text-muted-foreground">{rating.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Ratings;