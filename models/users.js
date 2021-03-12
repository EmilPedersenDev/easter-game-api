module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      username: {
        type: String,
      },
      email: {
        type: String,
      },
      score: {
        type: Number,
      },
    },
    { timestamps: true }
  );

  const user = mongoose.model("User", userSchema);
  return user;
};
