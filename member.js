function skillsMember() {
  return {
    name: 'member',
    skills: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT'],
    showSkills: function() {
      this.skills.forEach((skill) => {
        console.log(`${this.name} knows ${skill}`);
      });
    },
  };
}