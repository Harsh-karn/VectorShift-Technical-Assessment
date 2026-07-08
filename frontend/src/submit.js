import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export function SubmitButton() {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async (e) => {
        e.preventDefault(); // just in case
        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));
            
            
            const res = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });
            
            const data = await res.json();
            
            alert(
                `Pipeline Analysis Result\n` +
                `------------------------\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
            );
        } catch (err) {
            console.error("submit failed:", err);
            alert('Error parsing pipeline. Is the backend actually running on 8000?');
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
            <button type="button" className="submit-button" onClick={handleSubmit}>Submit Pipeline</button>
        </div>
    );
}
