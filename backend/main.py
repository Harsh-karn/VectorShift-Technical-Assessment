from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
    except Exception:
        return {'error': 'Invalid JSON in pipeline'}
        
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Build adjacency list and check if the graph is a DAG
    adj = {n['id']: [] for n in nodes}
    for e in edges:
        src = e.get('source')
        tgt = e.get('target')
        if src in adj and tgt in adj:
            adj[src].append(tgt)
            
    is_dag = True
    visited = set()
    rec_stack = set()
    
    def has_cycle(v):
        visited.add(v)
        rec_stack.add(v)
        
        for neighbor in adj.get(v, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
                
        rec_stack.remove(v)
        return False
        
    for n in nodes:
        n_id = n['id']
        if n_id not in visited:
            if has_cycle(n_id):
                is_dag = False
                break
                
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
