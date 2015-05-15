var _ = require('../public/javascripts/underscore.js');
var pageCount = 0;
var words = [];
 var stop_words = ["", "-", "_", ".", "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "I", "I'm", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];

var generateWordFreqs = function(words){
  var largest = 0;
  
  // get word freqs - put in objects, sort objects by freq, 
  // take top 200 & normalize around 100
  var word_objects = _(words).chain()
  .groupBy(_.identity)
  .map(function (values, key) {
    return {
      size: values.length,
      text: key
    };
  })
  .filter(function (d){
    return (stop_words.indexOf(d.text) < 0);
  })
  .sortBy(function (d) { return -d.size; })
  .first(50)
  .map(function(d){
    if (largest == 0){ largest = d.size};
    return {
      size: Math.round(Math.log(1 + 999 * d.size/largest)*20),
      text: d.text
    }
  })
  .value();
  
  return word_objects;
};

module.exports.generateWordFreqs = generateWordFreqs;
