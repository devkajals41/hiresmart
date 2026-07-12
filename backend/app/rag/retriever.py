import re
import math

class SimpleRetriever:
    """
    A lightweight, pure-Python RAG Retriever.
    Uses TF-IDF term matching and cosine similarity to find the most relevant 
    resume chunks based on the target job role and interview topic.
    """

    def __init__(self, parsed_resume: dict):
        self.parsed_resume = parsed_resume
        self.chunks = self._generate_chunks()

    def _generate_chunks(self) -> list[str]:
        """
        Slice the structured resume into separate text chunks (experiences, projects, etc.)
        so we can query/retrieve them selectively.
        """
        chunks = []

        # 1. Chunk Education entries
        for edu in self.parsed_resume.get("education", []):
            chunks.append(
                f"Education: Candidate studied at {edu.get('institution')} for a {edu.get('degree')}. "
                f"Duration: {edu.get('duration')}. Grade: {edu.get('cgpa') or edu.get('percentage') or 'N/A'}."
            )

        # 2. Chunk Work Experiences
        for exp in self.parsed_resume.get("experience", []):
            chunks.append(
                f"Work Experience: Role: {exp.get('role')} at Company: {exp.get('company')}. "
                f"Duration: {exp.get('duration')}. Description: {exp.get('description')}"
            )

        # 3. Chunk Personal Projects
        for proj in self.parsed_resume.get("projects", []):
            chunks.append(
                f"Project: Title: {proj.get('title')}. Technologies: {', '.join(proj.get('technologies', []))}. "
                f"Duration: {proj.get('duration')}. Details: {proj.get('description')}. Link: {proj.get('github') or ''}"
            )

        # 4. Chunk Skills
        skills = self.parsed_resume.get("skills", {})
        if isinstance(skills, dict):
            for category, skills_list in skills.items():
                chunks.append(f"Skill Set ({category}): {', '.join(skills_list)}")

        return [c for c in chunks if c.strip()]

    def _tokenize(self, text: str) -> list[str]:
        """
        Split text into lowercase alphabetic words.
        """
        return re.findall(r'[a-z0-9]+', text.lower())

    def _compute_tf(self, tokens: list[str]) -> dict[str, float]:
        """
        Compute term frequencies for a list of tokens.
        """
        tf = {}
        for t in tokens:
            tf[t] = tf.get(t, 0) + 1
        total = len(tokens) if tokens else 1
        return {k: v / total for k, v in tf.items()}

    def _compute_cosine_similarity(self, vec1: dict[str, float], vec2: dict[str, float]) -> float:
        """
        Compute cosine similarity between two term-frequency dictionaries.
        """
        intersection = set(vec1.keys()) & set(vec2.keys())
        numerator = sum([vec1[x] * vec2[x] for x in intersection])

        sum1 = sum([val ** 2 for val in vec1.values()])
        sum2 = sum([val ** 2 for val in vec2.values()])
        denominator = math.sqrt(sum1) * math.sqrt(sum2)

        if not denominator:
            return 0.0
        return numerator / denominator

    def retrieve(self, query: str, top_k: int = 2) -> list[str]:
        """
        Search and return the top-K most relevant chunks matching the query.
        """
        if not self.chunks:
            return []

        query_tokens = self._tokenize(query)
        query_vector = self._compute_tf(query_tokens)

        ranked_chunks = []
        for chunk in self.chunks:
            chunk_tokens = self._tokenize(chunk)
            chunk_vector = self._compute_tf(chunk_tokens)
            similarity = self._compute_cosine_similarity(query_vector, chunk_vector)
            ranked_chunks.append((similarity, chunk))

        # Sort by similarity score in descending order
        ranked_chunks.sort(key=lambda x: x[0], reverse=True)

        # Retrieve top K chunks (minimum similarity of 0.05 to avoid irrelevant items)
        results = [chunk for score, chunk in ranked_chunks[:top_k] if score > 0.05]
        
        # If no similarity was found, return default overview chunks
        if not results:
            results = self.chunks[:top_k]

        return results
